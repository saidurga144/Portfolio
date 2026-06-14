"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { Cloud, MapPin } from "lucide-react";

const highlights = [
  "40% faster deployment times on AWS",
  "Deployed Docker virtualization & S3 storage solutions",
  "Designed auto-scaling, load-balanced real-time cloud systems",
  "Built CI/CD pipelines reducing release cycles",
];
const tech = ["AWS", "Docker", "S3", "CI/CD", "Auto-scaling", "Load Balancers"];

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14">
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span className="font-bold italic"
              style={{ fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-text-1)" }}>
              My Experience
            </span>
            <span className="font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                color: "var(--color-accent-purple)" }}>
              Work &amp; Internships
            </span>
          </h2>
          <div className="h-px w-20" style={{ background: "linear-gradient(90deg, var(--color-accent-purple), transparent)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl p-4 sm:p-8 max-w-3xl"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)" }}>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ThemedIcon size={32} accentColor="var(--color-accent-purple)">
                  <Cloud size={16} />
                </ThemedIcon>
                <h3 className="text-lg font-bold" style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}>
                  Cloud Computing Intern
                </h3>
              </div>
              <p className="text-sm font-semibold mb-1"
                style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
                Micro Information Technology Service
              </p>
              <p className="text-xs flex items-center gap-1.5"
                style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>
                <ThemedIcon size={22} accentColor="var(--color-accent-cyan)">
                  <MapPin size={11} />
                </ThemedIcon>
                Ambala &amp; Bhiwani, Haryana, India
              </p>
            </div>
            <span className="shrink-0 text-xs px-3 py-1.5 rounded-full font-medium self-start"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)",
                color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
              May 2025 – June 2025
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {highlights.map((h, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 text-sm"
                style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                <span className="mt-0.5 shrink-0 text-xs" style={{ color: "var(--color-accent-purple)" }}>▸</span>
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
                  color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
