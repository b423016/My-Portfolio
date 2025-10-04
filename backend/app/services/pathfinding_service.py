import heapq
from typing import List, Tuple

def a_star(grid: List[List[int]], start: List[int], end: List[int]) -> Tuple[List[List[int]], int]:
    """
    Implements the A* pathfinding algorithm on a 2D grid.
    
    Args:
        grid: 2D list where 0 is free space, 1 is wall
        start: [row, col] of start position
        end: [row, col] of end position
        
    Returns:
        Tuple of (path as list of [row, col], nodes_explored)
    """
    if not grid or not grid[0]:
        return [], 0
    
    rows, cols = len(grid), len(grid[0])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # up, down, left, right
    
    def heuristic(a: Tuple[int, int], b: Tuple[int, int]) -> int:
        return abs(a[0] - b[0]) + abs(a[1] - b[1])  # Manhattan distance
    
    start_pos = tuple(start)
    end_pos = tuple(end)
    
    if grid[start[0]][start[1]] == 1 or grid[end[0]][end[1]] == 1:
        return [], 0
    
    frontier = []
    heapq.heappush(frontier, (0, start_pos))
    came_from = {start_pos: None}
    cost_so_far = {start_pos: 0}
    nodes_explored = 0
    
    while frontier:
        current = heapq.heappop(frontier)[1]
        nodes_explored += 1
        
        if current == end_pos:
            break
        
        for dr, dc in directions:
            neighbor = (current[0] + dr, current[1] + dc)
            if 0 <= neighbor[0] < rows and 0 <= neighbor[1] < cols and grid[neighbor[0]][neighbor[1]] == 0:
                new_cost = cost_so_far[current] + 1
                if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                    cost_so_far[neighbor] = new_cost
                    priority = new_cost + heuristic(neighbor, end_pos)
                    heapq.heappush(frontier, (priority, neighbor))
                    came_from[neighbor] = current
    
    # Reconstruct path
    if end_pos not in came_from:
        return [], nodes_explored
    
    path = []
    current = end_pos
    while current is not None:
        path.append([current[0], current[1]])
        current = came_from[current]
    path.reverse()
    
    return path, nodes_explored