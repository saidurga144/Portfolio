"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CategoryList, Category } from "@/components/ui/category-list";
import { Code2, Server, Database, Shield, Globe, GitBranch } from "lucide-react";

// 8 bubbles, evenly spread across the canvas with no clipping
const bubbles = [
  { label: "HTML",    color: "#E34F26", x: 22,  y: 18,  size: 56, delay: 0    },
  { label: "React",   color: "#61DAFB", x: 65,  y: 14,  size: 62, delay: 0.6  },
  { label: "MySQL",   color: "#4479A1", x: 42,  y: 38,  size: 50, delay: 0.35 },
  { label: "Java",    color: "#ED8B00", x: 15,  y: 58,  size: 54, delay: 0.55 },
  { label: "CSS",     color: "#1572B6", x: 78,  y: 42,  size: 52, delay: 0.3  },
  { label: "Node.js", color: "#339933", x: 55,  y: 65,  size: 58, delay: 0.2  },
  { label: "JS",      color: "#F7DF1E", x: 28,  y: 78,  size: 54, delay: 0.5  },
  { label: "Git",     color: "#F05032", x: 78,  y: 76,  size: 50, delay: 0.8  },
];

const skillCategories: Category[] = [
  {
    id: 1,
    title: "Frontend Development",
    subtitle: "HTML · CSS · React · JavaScript · Tailwind CSS",
    icon: <Globe className="w-6 h-6" />,
    accent: "#06B6D4",
    featured: true,
  },
  {
    id: 2,
    title: "Backend & APIs",
    subtitle: "Node.js · REST APIs · Java · Express",
    icon: <Server className="w-6 h-6" />,
    accent: "#8B5CF6",
  },
  {
    id: 3,
    title: "Databases & Tools",
    subtitle: "MySQL · MongoDB · PostgreSQL · GitHub",
    icon: <Database className="w-6 h-6" />,
    accent: "#8B5CF6",
  },
  {
    id: 4,
    title: "Cybersecurity",
    subtitle: "Network Security · Ethical Hacking · Vulnerability Assessment",
    icon: <Shield className="w-6 h-6" />,
    accent: "#10B981",
  },
  {
    id: 5,
    title: "Programming Languages",
    subtitle: "Python · Java · JavaScript · C",
    icon: <Code2 className="w-6 h-6" />,
    accent: "#F59E0B",
  },
];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span
              className="font-bold italic"
              style={{
                fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: "var(--color-text-1)",
              }}
            >
              My Skills
            </span>
            <span
              className="font-semibold tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                color: "var(--color-accent-purple)",
              }}
            >
              Technologies &amp; Tools
            </span>
          </h2>
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(90deg, var(--color-accent-purple), transparent)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* LEFT — compact header + full bubble canvas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              minHeight: "540px",
            }}
          >
            {/* Compact header row at top */}
            <div className="flex items-center gap-3 px-6 pt-5 pb-3 z-10 relative shrink-0"
              style={{ borderBottom: "1px solid var(--color-border)" }}>
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  color: "#fff",
                  boxShadow: "0 2px 12px rgba(139,92,246,0.4)",
                }}
              >
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <p
                  className="text-sm font-bold leading-none"
                  style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}
                >
                  What I Know Best
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}
                >
                  Technologies &amp; tools I work with
                </p>
              </div>
            </div>

            {/* Bubbles — fill remaining space */}
            <div className="relative flex-1">
              {bubbles.map((b) => (
                <motion.div
                  key={b.label}
                  className="absolute flex items-center justify-center rounded-full font-bold text-xs select-none"
                  style={{
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: b.size,
                    height: b.size,
                    background: `${b.color}1a`,
                    border: `1.5px solid ${b.color}45`,
                    color: b.color,
                    fontFamily: "var(--font-space-grotesk)",
                    transform: "translate(-50%, -50%)",
                    boxShadow: `0 0 16px ${b.color}18`,
                  }}
                  animate={{ y: [0, -8, 0], rotate: [0, 1.5, -1.5, 0] }}
                  transition={{
                    duration: 3.5 + b.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: b.delay,
                  }}
                >
                  {b.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — CategoryList */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <CategoryList
              title=""
              categories={skillCategories}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
