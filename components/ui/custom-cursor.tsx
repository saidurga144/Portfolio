"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([]);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        const newRipple: TouchRipple = {
          id: Date.now(),
          x: touch.clientX,
          y: touch.clientY,
        };
        setTouchRipples(prev => [...prev, newRipple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setTouchRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 800);
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition);
      document.addEventListener("mouseleave", handleMouseLeave);
    } else {
      // Add touch event listener for mobile
      window.addEventListener("touchstart", handleTouch);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [isMobile]);

  // Mobile touch ripples
  if (isMobile) {
    return (
      <AnimatePresence>
        {touchRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
          >
            <div className="w-10 h-10 border-2 border-cyan-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  }

  // Desktop custom cursor
  if (!isVisible) return null;

  return (
    <>
      {/* Outer circle ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-10 h-10 border-2 border-white rounded-full" />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 35,
          mass: 0.2,
        }}
      >
        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
      </motion.div>
    </>
  );
}
