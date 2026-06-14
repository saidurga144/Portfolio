"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink, Shield, Leaf, Target } from "lucide-react";

/* ─── Project data ─── */
const projects = [
  {
    id: "project-1",
    index: "01",
    tag: "ML / AGRI",
    name: "AgriPredict",
    url: "https://agripredictf.vercel.app",
    tech: ["Python", "Flask", "ML", "React", "Vercel"],
    accent: "#8B5CF6",
    icon: Leaf,
    previewImage: "/preview-agripredict.jpg",
    why: {
      headline: "Farmers make costly decisions without data.",
      body: "Crop selection based on intuition leads to yield loss. AgriPredict turns soil and weather parameters into actionable recommendations backed by ML models.",
    },
    how: {
      headline: "Random Forest classifier trained on crop datasets.",
      body: "A Flask API wraps the model and exposes predictions to a React UI. Users input NPK, pH, rainfall and temperature values to get ranked crop suggestions.",
    },
    achieves: {
      headline: "Data-driven crop selection in seconds.",
      body: "Reduced guesswork for smallholder farmers. Supports 22 crop types with 96%+ accuracy. Live on Vercel with a mobile-friendly interface.",
    },
  },
  {
    id: "project-2",
    index: "02",
    tag: "SECURITY",
    name: "Link-Armor",
    url: "https://link-armor.vercel.app",
    tech: ["React", "Node.js", "Sec APIs", "Vercel"],
    accent: "#06B6D4",
    icon: Shield,
    previewImage: "/preview-linkarmor.jpg",
    why: {
      headline: "URLs can look clean but hide malicious intent.",
      body: "Existing tools were either paywalled or too slow for real-time checking. I built Link-Armor to give instant, multi-source threat verdicts for any link.",
    },
    how: {
      headline: "Multi-API threat intelligence with a React front-end.",
      body: "Queries VirusTotal, Google Safe Browsing, and custom heuristics in parallel. Results are aggregated and scored in under a second via a Node.js proxy.",
    },
    achieves: {
      headline: "Instant phishing & malware detection for any URL.",
      body: "Flags suspicious redirect chains, domain age anomalies, and known malware hosts. Fully deployed and accessible with zero login required.",
    },
  },
  {
    id: "project-3",
    index: "03",
    tag: "CAREER",
    name: "CareerGuide",
    url: "https://inspirzy.vercel.app",
    tech: ["React", "Node.js", "Psychology", "Vercel"],
    accent: "#F59E0B",
    icon: Target,
    previewImage: "/preview-careerguide.jpg",
    why: {
      headline: "Most career tools ignore personality and mindset.",
      body: "Aptitude tests tell you what you're good at but not what fits your psychology. CareerGuide combines trait mapping with skill assessment to close that gap.",
    },
    how: {
      headline: "Psychometric profiling mapped to career archetypes.",
      body: "Built on established frameworks (Big Five traits). A weighted scoring engine cross-references results against a curated career database to produce ranked paths.",
    },
    achieves: {
      headline: "Personalised career roadmaps you can act on.",
      body: "Users get a ranked list of career paths with required skills, certifications, and growth milestones — tailored to who they are, not just what they know.",
    },
  },
  {
    id: "project-4",
    index: "04",
    tag: "SECURITY",
    name: "Clarionet",
    url: "https://clarionet.vercel.app",
    tech: ["React", "TypeScript", "Vercel"],
    accent: "#10B981",
    icon: Shield,
    previewImage: "https://clarionet.vercel.app/og-image.png",
    why: {
      headline: "Educational vulnerability demonstration.",
      body: "I developed this tool purely for educational purposes—to demonstrate how vulnerable mobile devices can be if left unprotected, so developers understand why strong PINs and multi-factor authentication are essential.",
    },
    how: {
      headline: "ADB PIN brute force simulator.",
      body: "It uses ADB to simulate a brute force attack on a device PIN in a controlled, isolated lab environment. This automated process shows how attackers could exploit weak PINs, but it is never used on real devices without consent.",
    },
    achieves: {
      headline: "Proactive mobile security education.",
      body: "It helps educate security teams and developers about real risks, so they proactively strengthen device security, ensuring better protection against brute force attacks in real-world scenarios.",
    },
  },
];

/* ─── Tech brand icons as inline SVGs ─── */
const techIcons: Record<string, { svg: React.ReactNode; color: string }> = {
  "React":      { color: "#61DAFB", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 9.861A2.139 2.139 0 1 0 12 14.14 2.139 2.139 0 1 0 12 9.861zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 3.967l-.135.283h-.3a23.485 23.485 0 0 0-3.658.218l-.534.071zm1.098-6.15c-.815 0-1.55.493-1.974 1.486A24.764 24.764 0 0 1 6.997 7.9a24.82 24.82 0 0 1 3.346-.218 23.823 23.823 0 0 1 2.157-3.578c-1.811-1.657-3.39-2.307-4.092-2.309zm9.293 2.355l-.134.467a23.413 23.413 0 0 0-.961 3.839l-.06.5-.49-.022a23.507 23.507 0 0 0-3.638.144l-.3.028-.133-.281a23.464 23.464 0 0 0-2.422-3.967l-.34-.349.34-.349C9.135 2.044 11.515 1.004 13 1.86c1.512.872 1.812 3.37.826 6.857zM12.75 4.12c-.815 0-1.989.558-3.217 1.793a23.823 23.823 0 0 1 2.157 3.578 24.82 24.82 0 0 1 3.346.218 23.297 23.297 0 0 0-.925-3.802c-.432-.993-1.167-1.487-1.361-1.487z"/></svg> },
  "Node.js":    { color: "#339933", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.998 24C5.372 24 0 18.628 0 12S5.372 0 11.998 0C18.626 0 24 5.372 24 12s-5.374 12-12.002 12zm-.09-16.268c-.165 0-.33.044-.479.132L7.113 9.962a.952.952 0 0 0-.479.831v4.223c0 .342.183.661.479.831l4.316 2.498a.955.955 0 0 0 .959 0l4.317-2.498a.952.952 0 0 0 .479-.831V10.76a.952.952 0 0 0-.479-.831l-1.435-.829v-1.5c0-.353-.28-.64-.633-.64s-.633.287-.633.64v1.5L12 8.299l-1.509.872V7.665c0-.353-.28-.64-.633-.64z"/></svg> },
  "Python":     { color: "#3776AB", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/></svg> },
  "Flask":      { color: "#00B5D8", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M10 2c0-.552.895-1 2-1s2 .448 2 1v1.152A8.004 8.004 0 0 1 20 11v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a8.004 8.004 0 0 1 6-7.848V2zm2 1.5a6 6 0 1 0 0 12A6 6 0 0 0 12 3.5zm0 2a.75.75 0 0 1 .75.75v3.5h2.5a.75.75 0 0 1 0 1.5h-3.25A.75.75 0 0 1 11.25 10.5v-4.25A.75.75 0 0 1 12 5.5z"/></svg> },
  "ML":         { color: "#F59E0B", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m8 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2M4 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m8 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m0-4.5 4 2.5v5l-4 2.5L8 17v-5l4-2.5Z"/></svg> },
  "Vercel":     { color: "#ffffff", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg> },
  "Sec APIs":   { color: "#EF4444", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  "Psychology": { color: "#F59E0B", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  "TypeScript": { color: "#3178C6", svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
};

function TechIcon({ tech, color }: { tech: string; color: string }) {
  const icon = techIcons[tech];
  const displayColor = icon?.color || color;
  return (
    <div
      title={tech}
      className="flex items-center justify-center w-8 h-8 rounded-full select-none shrink-0"
      style={{
        background: `${displayColor}18`,
        border: `1.5px solid ${displayColor}45`,
        color: displayColor,
      }}
    >
      {icon ? (
        <span className="w-4 h-4 flex items-center justify-center">
          {React.cloneElement(icon.svg as React.ReactElement, { className: "w-4 h-4" })}
        </span>
      ) : (
        <span style={{ fontSize: "8px", fontFamily: "var(--font-space-grotesk)", fontWeight: 700, letterSpacing: "0.03em" }}>
          {tech.slice(0, 3).toUpperCase()}
        </span>
      )}
    </div>
  );
}
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.94, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.55]);
  const y       = useTransform(scrollYProgress, [0, 0.25], [48, 0]);

  const isInView = useInView(cardRef, { once: true, margin: "-8%" });
  const Icon = project.icon;

  /* tech icon letter colours — cycle through accent shades */
  const techColors = ["#06B6D4", "#8B5CF6", "#F59E0B", "#10B981", "#F43F5E"];

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y, zIndex: 10 + index }}
      className="sticky top-20 w-full"
    >
      <div
        className="w-full overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: "var(--project-card-bg, #0d1117)",
          border: "1px solid var(--project-card-border, rgba(255,255,255,0.08))",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* ══ HEADER ══ */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-7 py-5"
          style={{ borderBottom: "1px solid var(--project-card-border-subtle, rgba(255,255,255,0.07))" }}
        >
          {/* Left: big index + tag + italic name */}
          <div className="flex items-center gap-5">
            <span
              className="text-[3.5rem] font-black leading-none select-none tabular-nums"
              style={{
                color: "var(--project-card-index, rgba(255,255,255,0.07))",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {project.index}
            </span>
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full border w-fit"
                style={{
                  color: "var(--project-card-text-3, rgba(255,255,255,0.4))",
                  borderColor: "var(--project-card-border-subtle, rgba(255,255,255,0.14))",
                  fontFamily: "var(--font-inter-tight)",
                }}
              >
                {project.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-dancing-script), cursive",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  color: "var(--project-card-text-1, #ffffff)",
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Right: tech circle badges + CTA */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {project.tech.map((t, ti) => (
                <TechIcon key={t} tech={t} color={techColors[ti % techColors.length]} />
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-[0.97]"
              style={{
                border: "1.5px solid var(--project-card-btn-border, rgba(255,255,255,0.28))",
                color: "var(--project-card-text-1, #ffffff)",
                fontFamily: "var(--font-inter-tight)",
              }}
            >
              Project Link
              <ExternalLink size={13} strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* ══ BODY: alternating — even: info left + image right | odd: image left + info right ══ */}
        {(() => {
          const isEven = index % 2 === 0;

          const infoPanels = (
            <div
              className="flex flex-col"
              style={{
                borderRight: isEven  ? "1px solid var(--project-card-border-subtle, rgba(255,255,255,0.07))" : "none",
                borderLeft:  !isEven ? "1px solid var(--project-card-border-subtle, rgba(255,255,255,0.07))" : "none",
              }}
            >
              {(
                [
                  { key: "why",      label: "WHY I BUILT IT",   data: project.why      },
                  { key: "how",      label: "HOW IT WORKS",     data: project.how      },
                  { key: "achieves", label: "WHAT IT ACHIEVES", data: project.achieves },
                ] as const
              ).map(({ key, label, data }, pi) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + pi * 0.1 }}
                  className="px-7 py-6 flex-1"
                  style={{
                    borderBottom: pi < 2 ? "1px solid var(--project-card-border-subtle, rgba(255,255,255,0.07))" : "none",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-px" style={{ background: "var(--project-card-border-subtle, rgba(255,255,255,0.18))" }} />
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                      style={{ color: "var(--project-card-text-3, rgba(255,255,255,0.28))", fontFamily: "var(--font-inter-tight)" }}
                    >
                      {label}
                    </p>
                  </div>
                  <p
                    className="font-semibold leading-snug mb-2"
                    style={{
                      color: "var(--project-card-text-1, #ffffff)",
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                    }}
                  >
                    {data.headline}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--project-card-text-2, rgba(255,255,255,0.42))", fontFamily: "var(--font-dm-sans)" }}
                  >
                    {data.body}
                  </p>
                </motion.div>
              ))}
            </div>
          );

          const previewPanel = (
            <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
              {/* Live iframe preview for all projects */}
              <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "var(--project-card-bg, #0d1117)" }}>
                <iframe
                  src={project.url}
                  title={`${project.name} live preview`}
                  className="absolute top-0 left-0 border-0"
                  style={{
                    width: "166.67%",
                    height: "166.67%",
                    transform: "scale(0.6)",
                    transformOrigin: "top left",
                    pointerEvents: "none",
                    opacity: 0.92,
                  }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Blend fade */}
                <div
                  className="absolute inset-y-0 pointer-events-none w-16"
                  style={{
                    [isEven ? "left" : "right"]: 0,
                    background: isEven
                      ? "linear-gradient(to right, var(--project-card-bg-gradient, #0d1117), transparent)"
                      : "linear-gradient(to left, var(--project-card-bg-gradient, #0d1117), transparent)",
                  }}
                />
                {/* Bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, var(--project-card-bg-gradient, #0d1117), transparent)" }}
                />
              </div>
            </div>
          );

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {isEven ? <>{infoPanels}{previewPanel}</> : <>{previewPanel}{infoPanels}</>}
            </div>
          );
        })()}

        {/* ══ FOOTER: tech stack names ══ */}
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-1 px-7 py-4"
          style={{ borderTop: "1px solid var(--project-card-border-subtle, rgba(255,255,255,0.07))" }}
        >
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: "var(--project-card-text-3, rgba(255,255,255,0.22))",
                fontFamily: "var(--font-inter-tight)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─── */
export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      className="relative py-24"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">
        {/* Heading row */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-end justify-between gap-6"
        >
          <div>
            <h2 className="leading-none flex flex-col gap-1 mb-3">
              <span
                className="font-bold italic"
                style={{
                  fontFamily: "var(--font-dancing-script), cursive",
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  color: "var(--color-accent-cyan)",
                }}
              >
                My Projects
              </span>
              <span
                className="font-semibold tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                  color: "var(--color-text-3)",
                }}
              >
                What I&apos;ve Built
              </span>
            </h2>
            <div
              className="h-px w-20"
              style={{
                background: "linear-gradient(90deg, var(--color-accent-cyan), transparent)",
              }}
            />
          </div>

          {/* View All button */}
          <a
            href="https://github.com/saidurga144"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] mb-3"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-2)",
              background: "var(--color-surface)",
              fontFamily: "var(--font-inter-tight)",
            }}
          >
            View All
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5" style={{ paddingBottom: "10vh" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
