"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface StylishNameProps {
  text: string;
  delay?: number;
}

export function StylishName({ text, delay = 0 }: StylishNameProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span className="relative inline-block">
      {text.split("").map((char, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ 
              opacity: 1, 
              y: isHovered ? -15 : 0,
              rotateX: 0,
              scale: isHovered ? 1.4 : 1,
              rotateZ: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: delay + index * 0.08 },
              y: { 
                duration: 0.5, 
                delay: delay + index * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 15
              },
              rotateX: { duration: 0.5, delay: delay + index * 0.08 },
              scale: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
              rotateZ: { duration: 0.4, repeat: isHovered ? Infinity : 0 },
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="inline-block relative"
            style={{
              display: char === " " ? "inline" : "inline-block",
              minWidth: char === " " ? "0.5em" : "auto",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Main letter with gradient */}
            <span className="relative inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-montserrat font-extrabold">
              {char === " " ? "\u00A0" : char}
            </span>
            
            {/* Glow effect on hover */}
            {isHovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400"
                style={{ zIndex: -1 }}
              />
            )}
            
            {/* Shadow effect on hover */}
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 0.3, y: 20 }}
                className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ zIndex: -2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
}
