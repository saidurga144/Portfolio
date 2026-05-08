"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { Shield, Leaf, Target, ExternalLink } from "lucide-react";

const projectIcons: Record<string, React.ReactNode> = {
  "🛡️": <Shield size={20} />,
  "🌾": <Leaf size={20} />,
  "🎯": <Target size={20} />,
};

const projects = [
  {
    name: "Link-Armor",
    url: "https://link-armor.vercel.app",
    period: "Oct 2025 – Dec 2025",
    description: "A real-time URL threat detection tool that analyses links for phishing, malware, and suspicious patterns using multiple security APIs.",
    tech: ["React", "Node.js", "Security APIs", "Vercel"],
    accent: "#06B6D4",
    icon: "🛡️",
  },
  {
    name: "AgriPredict",
    url: "https://agripredictf.vercel.app",
    period: "Jan 2026 – Feb 2026",
    description: "An ML-powered crop recommendation and yield prediction platform that helps farmers make data-driven agricultural decisions.",
    tech: ["Python", "ML", "React", "APIs", "Vercel"],
    accent: "#8B5CF6",
    icon: "🌾",
  },
  {
    name: "CareerGuide",
    url: "https://inspirzy.vercel.app",
    period: "Nov 2025 – Jan 2026",
    description: "A psychology-backed career guidance platform that maps personality traits and skills to ideal career paths and growth roadmaps.",
    tech: ["React", "Node.js", "Psychology Frameworks", "Vercel"],
    accent: "#06B6D4",
    icon: "🎯",
  },
];

function ProjectCard({ p, index, inView }: { p: (typeof projects)[0]; index: number; inView: boolean }) {
  const [imgState, setImgState] = useState<"loading" | "loaded" | "error">("loading");

  // Use local screenshots if available, otherwise show styled fallback
  const localPreview = `/preview-${p.name.toLowerCase().replace(/[^a-z]/g, '')}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.14 }}
      className="rounded-2xl flex flex-col group overflow-hidden h-full"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <ThemedIcon size={34} accentColor={p.accent}>{projectIcons[p.icon]}</ThemedIcon>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}>{p.name}</h3>
            <p className="text-[11px]" style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>{p.period}</p>
          </div>
        </div>
        <ThemedIcon href={p.url} label={`Visit ${p.name}`} size={34} accentColor={p.accent}>
          <ExternalLink size={14} />
        </ThemedIcon>
      </div>

      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2" style={{ background: "var(--color-surface-2, var(--color-bg))", borderBottom: "1px solid var(--color-border)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md text-[10px] truncate"
          style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>
          {p.url.replace("https://", "")}
        </div>
      </div>

      {/* Screenshot preview */}
      <a href={p.url} target="_blank" rel="noopener noreferrer"
        className="relative block overflow-hidden group/preview" style={{ height: "220px" }}>

        {/* Loading skeleton */}
        {imgState === "loading" && (
          <div className="absolute inset-0 z-10 animate-pulse"
            style={{ background: `linear-gradient(135deg, ${p.accent}08, var(--color-surface))` }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${p.accent}40`, borderTopColor: p.accent }} />
            </div>
          </div>
        )}

        {imgState !== "error" ? (
          <img
            key={localPreview}
            src={localPreview}
            alt={`${p.name} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
            style={{ opacity: imgState === "loaded" ? 1 : 0, transition: "opacity 0.4s ease" }}
            onLoad={() => setImgState("loaded")}
            onError={() => setImgState("error")}
            loading="lazy"
          />
        ) : (
          /* Styled fallback — looks intentional, not broken */
          <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}06 60%, var(--color-surface) 100%)` }}>
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
              style={{ background: p.accent, filter: "blur(24px)" }} />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-15"
              style={{ background: p.accent, filter: "blur(20px)" }} />
            {/* Project name */}
            <p className="text-2xl font-black tracking-tight relative z-10"
              style={{ color: p.accent, fontFamily: "var(--font-space-grotesk)", filter: "brightness(1.2)" }}>
              {p.name}
            </p>
            <p className="text-xs mt-1 relative z-10"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-sans)" }}>
              {p.url.replace("https://", "")}
            </p>
          </div>
        )}

        {/* Hover overlay — no button, just subtle darkening */}
        <div className="absolute inset-0 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.25)" }} />
      </a>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 px-5 py-4" style={{ borderTop: "1px solid var(--color-border)" }}>
        {p.tech.map((t) => (
          <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
            style={{ background: `${p.accent}10`, border: `1px solid ${p.accent}25`, color: p.accent, fontFamily: "var(--font-dm-sans)" }}>
            {t}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="px-5 pb-5">
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
          {p.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-24 overflow-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-12">
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span className="font-bold italic"
              style={{ fontFamily: "var(--font-dancing-script), cursive", fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-accent-cyan)" }}>
              My Projects
            </span>
            <span className="font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)", color: "var(--color-text-3)" }}>
              What I&apos;ve Built
            </span>
          </h2>
          <div className="h-px w-20" style={{ background: "linear-gradient(90deg, var(--color-accent-cyan), transparent)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
