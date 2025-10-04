import os
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from openai import OpenAI as OpenAIClient

# Load the OpenAI API key from environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

# Initialize the LLM
llm = OpenAI(temperature=0.7)
client = OpenAIClient()

# Load and process the resume data
loader = TextLoader("app/resume_data.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(texts, embeddings)

# Create the RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(),
    return_source_documents=True
)

def answer_query(query: str) -> dict:
    """
    Answer a query based on the resume data using RAG.
    
    Args:
        query (str): The user's query
        
    Returns:
        dict: Contains 'answer' and 'sources'
    """
    result = qa_chain({"query": query})
    return {
        "answer": result["result"],
        "sources": [doc.page_content for doc in result["source_documents"]]
    }

def generate_image(prompt: str) -> str:
    """
    Generate an image using OpenAI DALL-E based on the prompt.
    
    Args:
        prompt (str): The description of the image to generate
        
    Returns:
        str: The URL of the generated image
    """
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        raise Exception(f"Failed to generate image: {str(e)}")