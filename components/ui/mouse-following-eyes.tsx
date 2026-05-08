"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react";

const MouseFollowingEyes: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 flex justify-center items-center rounded-xl"
    >
      <div className="flex gap-8">
        <Eye mouseX={mousePos.x} mouseY={mousePos.y} />
        <Eye mouseX={mousePos.x} mouseY={mousePos.y} />
      </div>
    </div>
  );
};

interface EyeProps {
  mouseX: number;
  mouseY: number;
}

const Eye: React.FC<EyeProps> = ({ mouseX, mouseY }) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!eyeRef.current || !pupilRef.current) return;

    const eyeRect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate angle between eye center and mouse
    const dx = mouseX - eyeCenterX;
    const dy = mouseY - eyeCenterY;
    const angle = Math.atan2(dy, dx);

    // Maximum distance pupil can move from center
    const maxMove = 20;

    // Calculate pupil position
    const pupilX = Math.cos(angle) * maxMove;
    const pupilY = Math.sin(angle) * maxMove;

    // Apply transform
    pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  }, [mouseX, mouseY]);

  return (
    <div
      ref={eyeRef}
      className="relative bg-white border-4 border-violet-400 rounded-full h-24 w-24 flex items-center justify-center shadow-lg"
    >
      <div
        ref={pupilRef}
        className="absolute bg-violet-600 rounded-full h-8 w-8 transition-transform duration-100 ease-out"
      >
        <div className="w-3 h-3 bg-white rounded-full absolute bottom-1 right-1"></div>
      </div>
    </div>
  );
};

export { MouseFollowingEyes };
