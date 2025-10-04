"use client";
import React, { useRef, useEffect } from "react";

// Techy, dense animated background for terminal
export default function TerminalMotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    // Dense grid of moving lines, dots, and flickering code blocks
    const cols = Math.floor(w / 18);
    const rows = Math.floor(h / 18);
    const dots: {x: number, y: number, dx: number, dy: number, flicker: number}[] = [];
    for (let i = 0; i < cols * rows; i++) {
      dots.push({
        x: (i % cols) * 18 + Math.random() * 6,
        y: Math.floor(i / cols) * 18 + Math.random() * 6,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        flicker: Math.random()
      });
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      // Subtle grid lines
      ctx.strokeStyle = "rgba(60,255,180,0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 18, 0);
        ctx.lineTo(i * 18, h);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * 18);
        ctx.lineTo(w, j * 18);
        ctx.stroke();
      }
      // Dots and flickering blocks
      for (let dot of dots) {
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0) dot.x = w;
        if (dot.x > w) dot.x = 0;
        if (dot.y < 0) dot.y = h;
        if (dot.y > h) dot.y = 0;
        // Flickering effect
        dot.flicker += (Math.random() - 0.5) * 0.1;
        dot.flicker = Math.max(0, Math.min(1, dot.flicker));
        ctx.globalAlpha = 0.5 + dot.flicker * 0.5;
        ctx.fillStyle = dot.flicker > 0.7 ? "#00ff99" : "#23263a";
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.flicker > 0.7 ? 2.5 : 1.2, 0, Math.PI * 2);
        ctx.fill();
        // Flickering code block
        if (dot.flicker > 0.85) {
          ctx.globalAlpha = 0.18 + dot.flicker * 0.2;
          ctx.fillStyle = "#a3e635";
          ctx.fillRect(dot.x - 7, dot.y - 7, 14, 14);
        }
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
