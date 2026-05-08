"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
  accent?: string;
}

export interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

export const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full p-0", className)}>
      <div className="w-full">
        {/* Header */}
        {(title || subtitle || headerIcon) && (
          <div className="text-center mb-10">
            {headerIcon && (
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{
                  background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
                  color: "#fff",
                }}
              >
                {headerIcon}
              </div>
            )}
            {title && (
              <h1
                className="text-4xl md:text-5xl font-bold mb-1 tracking-tight"
                style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ color: "var(--color-text-3)", fontFamily: "var(--font-space-grotesk)" }}
              >
                {subtitle}
              </h2>
            )}
          </div>
        )}

        {/* Category rows */}
        <div className="space-y-3">
          {categories.map((category) => {
            const isHovered = hoveredItem === category.id;
            const accent = category.accent ?? "var(--color-accent-cyan)";

            return (
              <div
                key={category.id}
                className="relative group"
                onMouseEnter={() => setHoveredItem(category.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={category.onClick}
              >
                <div
                  className="relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out cursor-pointer"
                  style={{
                    height: isHovered ? "7rem" : "5.5rem",
                    border: isHovered
                      ? `1px solid ${accent}`
                      : "1px solid var(--color-border)",
                    background: isHovered
                      ? `color-mix(in srgb, ${accent} 6%, var(--color-surface))`
                      : "var(--color-surface)",
                    boxShadow: isHovered
                      ? `0 4px 24px color-mix(in srgb, ${accent} 20%, transparent)`
                      : "var(--shadow-card)",
                  }}
                >
                  {/* Corner brackets on hover */}
                  {isHovered && (
                    <>
                      <div className="absolute top-3 left-3 w-5 h-5">
                        <div className="absolute top-0 left-0 w-3.5 h-0.5 rounded-full" style={{ background: accent }} />
                        <div className="absolute top-0 left-0 w-0.5 h-3.5 rounded-full" style={{ background: accent }} />
                      </div>
                      <div className="absolute bottom-3 right-3 w-5 h-5">
                        <div className="absolute bottom-0 right-0 w-3.5 h-0.5 rounded-full" style={{ background: accent }} />
                        <div className="absolute bottom-0 right-0 w-0.5 h-3.5 rounded-full" style={{ background: accent }} />
                      </div>
                    </>
                  )}

                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r transition-all duration-300"
                    style={{
                      background: accent,
                      opacity: isHovered ? 1 : 0.3,
                    }}
                  />

                  {/* Content */}
                  <div className="flex items-center justify-between h-full px-6 md:px-8">
                    <div className="flex-1 pl-2">
                      <h3
                        className="font-bold transition-colors duration-300"
                        style={{
                          fontSize: category.featured ? "clamp(1.2rem, 2.5vw, 1.6rem)" : "clamp(1rem, 2vw, 1.3rem)",
                          color: isHovered ? accent : "var(--color-text-1)",
                          fontFamily: "var(--font-space-grotesk)",
                        }}
                      >
                        {category.title}
                      </h3>
                      {category.subtitle && (
                        <div
                          style={{
                            maxHeight: isHovered ? "2rem" : "0px",
                            opacity: isHovered ? 1 : 0,
                            overflow: "hidden",
                            transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease",
                            marginTop: isHovered ? "2px" : "0px",
                          }}
                        >
                          <p
                            className="text-sm"
                            style={{
                              color: "var(--color-text-2)",
                              fontFamily: "var(--font-dm-sans)",
                            }}
                          >
                            {category.subtitle}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Icon — slides in on hover */}
                    {category.icon && (
                      <div
                        className="transition-all duration-300 ml-4"
                        style={{
                          color: accent,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "translateX(0)" : "translateX(12px)",
                        }}
                      >
                        {category.icon}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
