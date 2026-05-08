"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, decimals = 0, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(current.toFixed(decimals)));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, decimals, duration]);
  return count;
}

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
  decimals: number;
  delay: number;
  active: boolean;
}

function StatCard({ value, suffix, label, icon, color, decimals, delay, active }: StatCardProps) {
  const count = useCountUp(value, decimals, 2000, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="rounded-2xl p-6 text-center"
      style={{
        background: "#0F172A",
        border: `1px solid ${color}22`,
        boxShadow: `0 0 24px ${color}10`,
      }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-3xl font-black mb-1"
        style={{ color, fontFamily: "var(--font-space-grotesk)" }}>
        {count}{suffix}
      </div>
      <p className="text-xs" style={{ color: "#64748B", fontFamily: "var(--font-dm-sans)" }}>
        {label}
      </p>
    </motion.div>
  );
}

const stats = [
  { value: 3,    suffix: "+",  label: "Projects Deployed",  icon: "🚀", color: "#06B6D4", decimals: 0 },
  { value: 92,   suffix: "%",  label: "ML Model Accuracy",  icon: "📊", color: "#8B5CF6", decimals: 0 },
  { value: 100,  suffix: "+",  label: "Users Served",       icon: "👥", color: "#06B6D4", decimals: 0 },
  { value: 8.67, suffix: "",   label: "CGPA",               icon: "⭐", color: "#8B5CF6", decimals: 2 },
];

const hobbies = ["Coding", "Cloud Engineering", "Problem Solving", "Open Source", "AI/ML Research"];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-[#080C14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left: hobby pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-48 shrink-0"
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#475569", fontFamily: "var(--font-space-grotesk)" }}>
              Interests
            </p>
            <div className="flex flex-row lg:flex-col flex-wrap gap-2">
              {hobbies.map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
                  style={{
                    background: i % 2 === 0 ? "rgba(6,182,212,0.08)" : "rgba(139,92,246,0.08)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(6,182,212,0.2)" : "rgba(139,92,246,0.2)"}`,
                    color: i % 2 === 0 ? "#06B6D4" : "#8B5CF6",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right: stat cards */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                {...s}
                delay={0.2 + i * 0.1}
                active={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
