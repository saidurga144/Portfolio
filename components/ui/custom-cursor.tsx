"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [pos, setPos]         = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<{ x: number; y: number; radius: number; alpha: number }[]>([]);
  const rafRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  /* Theme-aware colors */
  const ringColor   = isDark ? "rgba(255,255,255,0.55)" : "rgba(46,42,37,0.45)";
  const fillColor   = isDark ? "#0a0a0a"               : "#F8F5F0";   /* circle fill */
  const dotColor    = isDark ? "#F8F5F0"               : "#2E2A25";   /* inner dot   */
  const rippleColor = isDark ? "6,182,212"             : "46,42,37";  /* ripple RGB  */

  /* Detect mobile */
  useEffect(() => {
    setMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  /* Mouse tracking + ripple canvas */
  useEffect(() => {
    if (isMobile) return;

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

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, alpha: 0.5 });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current.forEach((r) => {
        r.radius += 1.6;
        r.alpha  -= 0.011;
        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rippleColor}, ${r.alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });
      ripplesRef.current = ripplesRef.current.filter((r) => r.alpha > 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, rippleColor]);

  /* Touch ripples for mobile */
  const handleTouch = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    const ripple: TouchRipple = { id: Date.now(), x: touch.clientX, y: touch.clientY };
    setTouchRipples((prev) => [...prev, ripple]);
    setTimeout(() => setTouchRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 800);
  };

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [isMobile]);

  /* Mobile — touch ripples only */
  if (isMobile) {
    return (
      <AnimatePresence>
        {touchRipples.map((r) => (
          <motion.div key={r.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999]"
            style={{ left: r.x - 20, top: r.y - 20 }}
          >
            <div className="w-10 h-10 border-2 border-cyan-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Tidal ripple canvas — full viewport */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9997]"
      />

      {/* Outer ring — filled circle */}
      {visible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{ x: pos.x - 20, y: pos.y - 20 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{
              background: fillColor,
              border: `1.5px solid ${ringColor}`,
              boxShadow: isDark
                ? "0 0 12px rgba(6,182,212,0.15)"
                : "0 0 10px rgba(46,42,37,0.08)",
            }}
          />
        </motion.div>
      )}

      {/* Inner dot */}
      {visible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          animate={{ x: pos.x - 3, y: pos.y - 3 }}
          transition={{ type: "spring", stiffness: 1000, damping: 35, mass: 0.2 }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: dotColor }}
          />
        </motion.div>
      )}
    </>
  );
}
