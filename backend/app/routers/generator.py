from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import generate_image

router = APIRouter()

class GenerateThumbnailRequest(BaseModel):
    prompt: str

class GenerateThumbnailResponse(BaseModel):
    imageUrl: str

@router.post("/generate-thumbnail", response_model=GenerateThumbnailResponse)
async def generate_thumbnail(request: GenerateThumbnailRequest):
    """
    Endpoint to generate an image thumbnail based on a prompt using AI.
    
    Request body:
    {
        "prompt": "A futuristic city at night"
    }
    
    Response:
    {
        "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/.../image.png"
    }
    """
    try:
        image_url = generate_image(request.prompt)
        return GenerateThumbnailResponse(imageUrl=image_url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating thumbnail: {str(e)}")