"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemedIconProps {
  children: React.ReactNode;
  size?: number;
  className?: string;
  href?: string;
  label?: string;
  onClick?: () => void;
  accentColor?: string;
}

/**
 * Circular icon button that adapts to theme:
 * - Dark mode: filled dark navy circle with light icon (like the filled icons in the reference)
 * - Light mode: outlined circle with dark navy icon (like the outlined icons in the reference)
 */
export function ThemedIcon({
  children,
  size = 40,
  className = "",
  href,
  label,
  onClick,
  accentColor,
}: ThemedIconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
    cursor: "pointer",
    ...(isDark
      ? {
          background: accentColor
            ? `${accentColor}22`
            : "rgba(15, 28, 56, 0.85)",
          border: `1.5px solid ${accentColor ?? "rgba(6,182,212,0.35)"}`,
          color: accentColor ?? "#06B6D4",
          boxShadow: `0 0 0 1px ${accentColor ?? "rgba(6,182,212,0.1)"}`,
        }
      : {
          background: "transparent",
          border: `1.5px solid ${accentColor ?? "#1B3A6B"}`,
          color: accentColor ?? "#1B3A6B",
          boxShadow: "none",
        }),
  };

  const hoverClass = isDark
    ? "hover:brightness-125"
    : "hover:bg-[#1B3A6B] hover:text-white";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${hoverClass} ${className}`}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`${hoverClass} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
