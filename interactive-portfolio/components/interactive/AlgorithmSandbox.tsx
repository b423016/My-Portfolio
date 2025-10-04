"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../contexts/PerformanceContext';
import { Play, Target, Zap, Shuffle, Trash2 } from 'lucide-react';

const GRID_SIZE = 12;

const AlgorithmSandbox: React.FC = () => {
  const { incrementApiCall } = usePerformance();
  
  // Initialize empty grid first to avoid hydration issues
  const getEmptyGrid = () => {
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  };

  // Initialize grid with predefined obstacles for consistent rendering
  const initializeGrid = () => {
    const newGrid = getEmptyGrid();
    // Add some predefined obstacles for a nice initial layout
    const initialObstacles = [[2, 3], [3, 3], [4, 3], [6, 7], [7, 7], [8, 7], [5, 1], [5, 2]];
    initialObstacles.forEach(([row, col]) => {
      if (row < GRID_SIZE && col < GRID_SIZE) {
        newGrid[row][col] = 1;
      }
    });
    return newGrid;
  };

  const [grid, setGrid] = useState<number[][]>(getEmptyGrid());
  const [isClient, setIsClient] = useState(false);
  const [start, setStart] = useState<[number, number]>([0, 0]);
  const [end, setEnd] = useState<[number, number]>([GRID_SIZE - 1, GRID_SIZE - 1]);

  const [path, setPath] = useState<[number, number][]>([]);
  const [animating, setAnimating] = useState(false);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set());

  // Initialize client-side only to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setGrid(initializeGrid());
  }, []);

  const handleCellClick = (row: number, col: number) => {
    // Simple toggle wall functionality - click to add/remove walls
    const newGrid = grid.map(r => [...r]);
    
    // Don't allow changing start or end positions
    if ((row === start[0] && col === start[1]) || (row === end[0] && col === end[1])) {
      return;
    }
    
    // Toggle wall
    newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1;
    setGrid(newGrid);
  };

  const generateRandomScenario = () => {
    if (!isClient || animating) return; // Only run on client side and when not animating
    
    // Use predefined scenarios to avoid randomization issues
    const scenarios = [
      {
        start: [0, 0] as [number, number],
        end: [GRID_SIZE - 1, GRID_SIZE - 1] as [number, number],
        obstacles: [[2, 2], [3, 3], [4, 4], [5, 6], [7, 3]]
      },
      {
        start: [1, 1] as [number, number],
        end: [GRID_SIZE - 2, GRID_SIZE - 2] as [number, number],
        obstacles: [[3, 1], [3, 2], [3, 3], [6, 7], [7, 7]]
      },
      {
        start: [0, GRID_SIZE - 1] as [number, number],
        end: [GRID_SIZE - 1, 0] as [number, number],
        obstacles: [[4, 4], [4, 5], [4, 6], [5, 4], [6, 4]]
      },
      {
        start: [2, 2] as [number, number],
        end: [GRID_SIZE - 3, GRID_SIZE - 3] as [number, number],
        obstacles: [[5, 5], [5, 6], [6, 5], [7, 8], [8, 7]]
      }
    ];
    
    // Use a simple counter instead of Date.now() for more predictable results
    const currentScenarioIndex = Math.floor(Math.random() * scenarios.length);
    const scenario = scenarios[currentScenarioIndex];
    const newGrid = getEmptyGrid();
    
    // Add obstacles safely
    scenario.obstacles.forEach(([row, col]) => {
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        newGrid[row][col] = 1;
      }
    });

    setStart(scenario.start);
    setEnd(scenario.end);
    setGrid(newGrid);
    setPath([]);
    setHighlighted(new Set());
    setVisited(new Set());
  };

  const clearGrid = () => {
    setGrid(getEmptyGrid());
    setPath([]);
    setHighlighted(new Set());
    setVisited(new Set());
  };

  // A* Algorithm implementation with visualization
  const heuristic = (a: [number, number], b: [number, number]) => {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  const getNeighbors = (node: [number, number]) => {
    const [row, col] = node;
    const neighbors: [number, number][] = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
        if (grid[newRow][newCol] === 0) {
          neighbors.push([newRow, newCol]);
        }
      }
    }
    return neighbors;
  };

  const findPath = () => {
    // Priority queue using array with proper sorting
    const openSet: Array<{node: [number, number], fScore: number, gScore: number}> = [];
    const closedSet = new Set<string>();
    const cameFrom = new Map<string, [number, number]>();
    const visitedNodes: [number, number][] = [];

    const startKey = `${start[0]}-${start[1]}`;
    const startHeuristic = heuristic(start, end);
    
    openSet.push({
      node: start,
      fScore: startHeuristic,
      gScore: 0
    });

    while (openSet.length > 0) {
      // Sort by fScore to always process the most promising node first
      openSet.sort((a, b) => a.fScore - b.fScore);
      const current = openSet.shift()!;
      const currentNode = current.node;
      const currentKey = `${currentNode[0]}-${currentNode[1]}`;

      // Skip if already processed
      if (closedSet.has(currentKey)) continue;

      // Mark as processed and add to visited nodes for visualization
      closedSet.add(currentKey);
      if (!(currentNode[0] === start[0] && currentNode[1] === start[1])) {
        visitedNodes.push(currentNode);
      }

      // Check if we reached the goal
      if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
        // Reconstruct path
        const path: [number, number][] = [];
        let temp: [number, number] | undefined = currentNode;
        
        while (temp) {
          path.unshift(temp);
          const tempKey = `${temp[0]}-${temp[1]}`;
          temp = cameFrom.get(tempKey);
        }
        
        return { path, visitedNodes };
      }

      // Explore all neighbors
      const neighbors = getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        const neighborKey = `${neighbor[0]}-${neighbor[1]}`;
        
        // Skip if already fully processed
        if (closedSet.has(neighborKey)) continue;

        const tentativeGScore = current.gScore + 1;
        
        // Check if this neighbor is already in open set
        const existingIndex = openSet.findIndex(item => 
          item.node[0] === neighbor[0] && item.node[1] === neighbor[1]
        );

        const shouldAddToOpenSet = existingIndex === -1;
        const isBetterPath = existingIndex >= 0 && tentativeGScore < openSet[existingIndex].gScore;

        if (shouldAddToOpenSet || isBetterPath) {
          // This path to neighbor is better than any previous one
          cameFrom.set(neighborKey, currentNode);
          const neighborHeuristic = heuristic(neighbor, end);
          const neighborFScore = tentativeGScore + neighborHeuristic;

          if (shouldAddToOpenSet) {
            // Add new node to open set
            openSet.push({
              node: neighbor,
              fScore: neighborFScore,
              gScore: tentativeGScore
            });
          } else {
            // Update existing node with better path
            openSet[existingIndex] = {
              node: neighbor,
              fScore: neighborFScore,
              gScore: tentativeGScore
            };
          }
        }
      }
    }

    // No path found
    return { path: [], visitedNodes };
  };

  const visualize = () => {
    if (animating) return;
    
    try {
      const { path, visitedNodes } = findPath();
      setPath(path);
      animateVisualization(visitedNodes, path);
      incrementApiCall();
    } catch (error) {
      console.error('Pathfinding error:', error);
      // Fallback to simple direct path
      const simplePath: [number, number][] = [[start[0], start[1]], [end[0], end[1]]];
      setPath(simplePath);
      animateVisualization([], simplePath);
    }
  };

  const animateVisualization = (visitedNodes: [number, number][], finalPath: [number, number][]) => {
    setAnimating(true);
    setHighlighted(new Set());
    setVisited(new Set());

    // Show more visited nodes to better demonstrate A* exploration
    const maxVisitedNodes = Math.min(visitedNodes.length, 80);
    const limitedVisitedNodes = visitedNodes.slice(0, maxVisitedNodes);

    // First animate the visited nodes (exploration) - slower to show the pattern
    limitedVisitedNodes.forEach((cell, index) => {
      setTimeout(() => {
        setVisited(prev => new Set(prev).add(`${cell[0]}-${cell[1]}`));
      }, index * 60); // Slower animation to show A* pattern
    });

    // Then animate the final path
    const pathDelay = limitedVisitedNodes.length * 60 + 500;
    setTimeout(() => {
      if (finalPath.length === 0) {
        setAnimating(false);
        return;
      }
      
      finalPath.forEach((cell, index) => {
        setTimeout(() => {
          setHighlighted(prev => new Set(prev).add(`${cell[0]}-${cell[1]}`));
          if (index === finalPath.length - 1) {
            setTimeout(() => setAnimating(false), 500);
          }
        }, index * 80);
      });
    }, pathDelay);
  };

  const getCellClass = (row: number, col: number) => {
    if (row === start[0] && col === start[1]) return 'bg-green-500';
    if (row === end[0] && col === end[1]) return 'bg-red-500';
    if (grid[row][col] === 1) return 'bg-gray-800';
    if (highlighted.has(`${row}-${col}`)) return 'bg-blue-500';
    return 'bg-white/20';
  };



  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        boxShadow: "0 0 40px rgba(139, 69, 255, 0.3)",
        borderColor: "rgba(139, 69, 255, 0.5)"
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Zap className="text-purple-400" size={24} />
          Algorithm Sandbox - A* Pathfinding
        </motion.h3>
        
        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          <motion.button
            onClick={visualize}
            disabled={animating}
            className="relative px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={16} className={animating ? 'animate-pulse' : ''} />
            {animating ? 'Finding Path...' : 'Find Path'}
            {animating && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={generateRandomScenario}
            disabled={animating}
            className="relative px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg disabled:opacity-50 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shuffle size={16} />
            Random Scenario
          </motion.button>

          <motion.button
            onClick={clearGrid}
            disabled={animating}
            className="relative px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg disabled:opacity-50 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={16} />
            Clear Grid
          </motion.button>
        </div>
        
        {/* Instructions */}
        <motion.p 
          className="text-slate-300 text-sm mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Click on grid cells to add/remove walls. Green = Start, Red = End
        </motion.p>

        <motion.div 
          className="relative bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-12 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isStart = rowIndex === start[0] && colIndex === start[1];
                const isEnd = rowIndex === end[0] && colIndex === end[1];
                const isWall = cell === 1;
                const isHighlighted = highlighted.has(`${rowIndex}-${colIndex}`);
                const isVisited = visited.has(`${rowIndex}-${colIndex}`);
                
                return (
                  <motion.div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-7 h-7 cursor-pointer border border-slate-600/50 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isStart ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-400/50' :
                      isEnd ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg shadow-rose-400/50' :
                      isWall ? 'bg-gradient-to-br from-slate-600 to-slate-800 shadow-slate-600/30' :
                      isHighlighted ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-400/50' :
                      isVisited ? 'bg-gradient-to-br from-yellow-400/70 to-orange-400/70 shadow-yellow-400/30' :
                      'bg-gradient-to-br from-slate-700/30 to-slate-800/30 border-slate-600/30 hover:bg-slate-600/50'
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (rowIndex + colIndex) * 0.01 }}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 20px rgba(139, 69, 255, 0.5)",
                      zIndex: 10
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isStart && <Play size={10} className="text-white drop-shadow-lg" />}
                    {isEnd && <Target size={10} className="text-white drop-shadow-lg" />}
                    {isHighlighted && !isStart && !isEnd && (
                      <motion.div
                        className="w-2 h-2 bg-white/90 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                    )}
                    {isVisited && !isStart && !isEnd && !isHighlighted && (
                      <motion.div
                        className="w-1.5 h-1.5 bg-white/60 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.05 }}
                      />
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AlgorithmSandbox;