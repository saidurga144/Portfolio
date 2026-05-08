"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "flex w-16 h-8 p-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-slate-900 border border-slate-700"
          : "bg-white border border-slate-300",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-slate-800"
              : "transform translate-x-8 bg-orange-100"
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-orange-600" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}
