"use client";
import React, { useRef, useEffect } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationFrameId: number;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const cols = Math.floor(w / 20);
    const yPos = Array(cols).fill(0);
    const chars = "アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(10,10,20,0.15)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "18px monospace";
      for (let i = 0; i < cols; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = "#00ff99";
        ctx.fillText(text, i * 20, yPos[i] * 20);
        // Slow down the speed by reducing the increment
        yPos[i] = yPos[i] > h / 20 ? 0 : yPos[i] + 0.3 + Math.random() * 0.2;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  );
}
