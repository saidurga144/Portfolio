"use client";

import React, { useState, useRef, useLayoutEffect, useEffect, cloneElement } from "react";

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  activeIndex?: number;           // controlled from outside
  defaultActiveIndex?: number;    // uncontrolled fallback
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const isControlled = controlledIndex !== undefined;

  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Reposition limelight whenever activeIndex changes
  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    if (limelight && activeItem) {
      const newLeft =
        activeItem.offsetLeft +
        activeItem.offsetWidth / 2 -
        limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) setTimeout(() => setIsReady(true), 50);
    }
  }, [activeIndex, isReady, items]);

  // When controlled index changes from outside, also re-trigger layout
  useEffect(() => {
    if (isControlled) setIsReady(false);
  }, [controlledIndex, isControlled]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (!isControlled) setInternalIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={`relative inline-flex items-center h-16 rounded-lg bg-card text-foreground border px-2 ${className ?? ""}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(el) => (navItemRefs.current[index] = el)}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 select-none ${iconContainerClassName ?? ""}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
        >
          {cloneElement(icon, {
            className: `w-5 h-5 transition-all duration-200 ease-in-out ${
              activeIndex === index
                ? "opacity-100 text-primary"
                : "opacity-35 text-foreground"
            } ${icon.props.className ?? ""} ${iconClassName ?? ""}`,
          })}
          {label && (
            <span
              className={`ml-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeIndex === index
                  ? "opacity-100 text-primary"
                  : "opacity-35 text-foreground"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {label}
            </span>
          )}
        </a>
      ))}

      {/* Limelight bar */}
      <div
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[3px] rounded-full bg-primary ${
          isReady ? "transition-[left] duration-300 ease-in-out" : ""
        } ${limelightClassName ?? ""}`}
        style={{
          left: "-999px",
          boxShadow: "0 0 14px 3px hsl(var(--primary) / 0.85)",
        }}
      >
        {/* Cone glow beneath the bar */}
        <div
          className="absolute left-[-30%] top-[3px] w-[160%] h-12 pointer-events-none"
          style={{
            clipPath: "polygon(5% 100%, 25% 0, 75% 0, 95% 100%)",
            background:
              "linear-gradient(to bottom, hsl(var(--primary) / 0.22), transparent)",
          }}
        />
      </div>
    </nav>
  );
};
