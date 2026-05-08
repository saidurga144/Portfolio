"use client";
// tidal-cursor

import { useEffect, useRef } from "react";

export function TidalCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<{ x: number; y: number; radius: number; alpha: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.7 });
    };

    const handleMove = (e: MouseEvent) => addRipple(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMove);

    let rafId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((r) => {
        r.radius += 1.8;
        r.alpha  -= 0.012;
        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          /* always cyan on the dark landing page */
          ctx.strokeStyle = `rgba(6, 182, 212, ${r.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      ripples.current = ripples.current.filter((r) => r.alpha > 0);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
    />
  );
}
