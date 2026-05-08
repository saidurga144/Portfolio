"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface InteractiveTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function InteractiveText({ text, className = "", delay = 0 }: InteractiveTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: hoveredIndex === index ? -10 : 0,
            scale: hoveredIndex === index ? 1.3 : 1,
          }}
          transition={{ 
            opacity: { duration: 0.3, delay: delay + index * 0.05 },
            y: { duration: 0.3, delay: delay + index * 0.05 },
            scale: { duration: 0.2 },
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="inline-block hover:text-cyan-400 transition-colors duration-200"
          style={{
            display: char === " " ? "inline" : "inline-block",
            minWidth: char === " " ? "0.25em" : "auto",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
