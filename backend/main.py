from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.routers import chatbot, algorithm, generator

app = FastAPI(title="Portfolio Backend API", version="1.0.0")

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chatbot.router, prefix="/api", tags=["chatbot"])
app.include_router(algorithm.router, prefix="/api", tags=["algorithm"])
app.include_router(generator.router, prefix="/api", tags=["generator"])

@app.get("/")
async def root():
    return {"message": "Welcome to Ayush's Portfolio Backend API"}