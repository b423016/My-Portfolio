"use client";
import React, { useRef, useEffect } from "react";

// Animated background: flowing code and numbers, techy and dense
export default function TerminalCodeMotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    // Dense columns for code/numbers
  const cols = Math.floor(w / 16);
  const yPos = Array(cols).fill(0);
  const lineSpacing = 12; // reduce spacing for more vertical density
    const codeLines = [
      "const user = { name: 'Ayush', role: 'AI Dev' };",
      "for(let i=0;i<100;i++){sum+=i;}",
      "def solve(): return pathfinding(A*, grid)",
      "if (input === 'gui') launchPortfolio();",
      "#include <iostream>",
      "public class Portfolio {}",
      "SELECT * FROM achievements;",
      "let matrix = new Array(n).fill(0);",
      "function boot() { ... }",
      "export default Terminal;"
    ];
    const numbers = "0123456789";
    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(24,26,32,0.18)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "13px JetBrains Mono, monospace";
      for (let i = 0; i < cols; i++) {
        // Randomly pick code or numbers
        let text;
        if (Math.random() < 0.5) {
          text = codeLines[Math.floor(Math.random() * codeLines.length)];
        } else {
          text = Array.from({length: Math.floor(10 + Math.random()*10)}, () => numbers[Math.floor(Math.random()*numbers.length)]).join("");
        }
        ctx.fillStyle = Math.random() < 0.7 ? "#a3e635" : "#00ff99";
        ctx.globalAlpha = 0.7 + Math.random() * 0.3;
        ctx.fillText(text, i * 16, yPos[i] * lineSpacing);
        yPos[i] = yPos[i] > h / lineSpacing ? 0 : yPos[i] + 0.5 + Math.random() * 0.5;
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.22, borderRadius: '1.25rem' }}
    />
  );
}
