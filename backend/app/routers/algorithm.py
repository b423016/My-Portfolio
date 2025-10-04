from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.pathfinding_service import a_star

router = APIRouter()

class OptimizeRouteRequest(BaseModel):
    grid: List[List[int]]
    start: List[int]
    end: List[int]

class OptimizeRouteResponse(BaseModel):
    path: List[List[int]]
    nodes_explored: int

@router.post("/optimize-route", response_model=OptimizeRouteResponse)
async def optimize_route(request: OptimizeRouteRequest):
    """
    Endpoint to find the optimal path using A* algorithm.
    
    Request body:
    {
        "grid": [[0,0,1,0], [0,1,0,0], ...],
        "start": [0, 0],
        "end": [3, 3]
    }
    
    Response:
    {
        "path": [[0,0], [0,1], [1,1], [2,1], [3,1], [3,2], [3,3]],
        "nodes_explored": 150
    }
    """
    try:
        path, nodes_explored = a_star(request.grid, request.start, request.end)
        return OptimizeRouteResponse(path=path, nodes_explored=nodes_explored)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error optimizing route: {str(e)}")