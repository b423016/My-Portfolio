from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import answer_query

router = APIRouter()

class ChatbotRequest(BaseModel):
    query: str

class ChatbotResponse(BaseModel):
    answer: str
    sources: list[str]

@router.post("/chatbot", response_model=ChatbotResponse)
async def chatbot_endpoint(request: ChatbotRequest):
    """
    Endpoint to interact with the AI chatbot about Ayush's work and experience.
    
    Request body:
    {
        "query": "What projects did Ayush work on?"
    }
    
    Response:
    {
        "answer": "Ayush worked on a Flight Route Optimization System and an Audio Recognition System...",
        "sources": ["Ayush Kumar Jha is an AI & Backend Engineer...", ...]
    }
    """
    try:
        result = answer_query(request.query)
        return ChatbotResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")