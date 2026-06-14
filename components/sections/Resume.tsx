"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { Mail, Phone, Globe, Download, MapPin, Briefcase, Shield, Code2, X } from "lucide-react";

const resumeContactIcons: Record<string, React.ReactNode> = {
  "📧": <Mail size={14} />,
  "📞": <Phone size={14} />,
  "🌐": <Globe size={14} />,
};

export function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [showPicker, setShowPicker] = useState(false);

  return (
    <section id="resume" ref={ref} className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">

        {/* ── Two-column on desktop: profile left, resume card right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — Profile / identity block (desktop only enhancement) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Section heading */}
            <div>
              <h2 className="leading-none flex flex-col gap-1 mb-2">
                <span className="font-bold italic"
                  style={{ fontFamily: "var(--font-dancing-script), cursive",
                    fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-accent-purple)" }}>
                  My Resume
                </span>
                <span className="font-semibold tracking-[0.3em] uppercase"
                  style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                    color: "var(--color-text-3)" }}>
                  Download &amp; Preview
                </span>
              </h2>
              <div className="h-px w-20"
                style={{ background: "linear-gradient(90deg, var(--color-accent-purple), transparent)" }} />
            </div>

            {/* Profile photo + name */}
            <div className="flex items-center gap-5">
              <div
                className="rounded-2xl overflow-hidden shrink-0"
                style={{
                  width: 100,
                  height: 100,
                  border: "2px solid var(--color-border)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.15)",
                }}
              >
                <img
                  src="/home .jpeg"
                  alt="Sai Kumar Dungala"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1"
                  style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}>
                  Sai Kumar Dungala
                </h3>
                <p className="text-sm font-medium"
                  style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
                  Cybersecurity Engineer · Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <MapPin size={14} />,    label: "Location",  value: "India",                              accent: "var(--color-accent-cyan)" },
                { icon: <Briefcase size={14} />, label: "Status",    value: "Open to Opportunities",              accent: "var(--color-accent-purple)" },
                { icon: <Mail size={14} />,      label: "Email",     value: "saikumard912@gmail.com",             accent: "var(--color-accent-cyan)" },
                { icon: <Phone size={14} />,     label: "Phone",     value: "+91 7396295445",                     accent: "var(--color-accent-purple)" },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <ThemedIcon size={28} accentColor={item.accent}>{item.icon}</ThemedIcon>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider"
                      style={{ color: item.accent, fontFamily: "var(--font-space-grotesk)" }}>
                      {item.label}
                    </p>
                    <p className="text-xs mt-0.5"
                      style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl p-4 sm:p-8 lg:mt-24"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)" }}
          >
            {/* Identity row */}
            <div className="flex items-center gap-4 mb-6 pb-6"
              style={{ borderBottom: "1px solid var(--color-border)" }}>
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                style={{ border: "2px solid var(--color-border)" }}>
                <img src="/home .jpeg" alt="Sai Kumar Dungala"
                  className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="text-base font-bold"
                  style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}>
                  Sai Kumar Dungala
                </h3>
                <p className="text-xs"
                  style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
                  Cybersecurity Engineer · Full-Stack Developer
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3 mb-8">
              {[
                { icon: "📧", label: "Email",     value: "saikumard912@gmail.com" },
                { icon: "📞", label: "Phone",     value: "7396295445" },
                { icon: "🌐", label: "Portfolio", value: "saikumar-dungala.vercel.app" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <ThemedIcon size={32}>{resumeContactIcons[item.icon]}</ThemedIcon>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider mb-0.5"
                      style={{ color: "var(--color-text-3)", fontFamily: "var(--font-space-grotesk)" }}>
                      {item.label}
                    </p>
                    <p className="text-xs"
                      style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download button — triggers picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.25)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <Download size={16} />
                Download Resume
              </button>

              {/* Resume picker popup — infographic style */}
              <AnimatePresence>
                {showPicker && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
                      onClick={() => setShowPicker(false)}
                    />

                    {/* Centered modal */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 16 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
                    >
                      <div
                        className="pointer-events-auto w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* ── Top circle badge ── */}
                        <div className="flex justify-center mb-[-32px] relative z-10">
                          <div
                            className="flex flex-col items-center justify-center w-24 h-24 rounded-full text-center"
                            style={{
                              background: "linear-gradient(145deg, var(--color-surface), var(--color-surface-2, var(--color-bg)))",
                              border: "4px solid transparent",
                              backgroundClip: "padding-box",
                              boxShadow: "0 0 0 4px #06B6D4, 0 0 0 7px rgba(6,182,212,0.25), 0 8px 32px rgba(0,0,0,0.3)",
                            }}
                          >
                            <Download size={20} style={{ color: "#06B6D4" }} />
                            <p
                              className="text-[9px] font-bold uppercase tracking-[0.12em] mt-1 leading-tight"
                              style={{ color: "var(--color-text-2)", fontFamily: "var(--font-inter-tight)" }}
                            >
                              Choose<br/>Resume
                            </p>
                          </div>
                        </div>

                        {/* ── Two cards row ── */}
                        <div
                          className="grid grid-cols-2 rounded-3xl overflow-hidden relative"
                          style={{
                            background: "var(--color-surface)",
                            border: "1.5px solid var(--color-border)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)",
                          }}
                        >
                          {/* Close button */}
                          <button
                            type="button"
                            onClick={() => setShowPicker(false)}
                            className="absolute top-4 right-4 z-10 rounded-full p-1.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                            style={{ color: "var(--color-text-3)" }}
                          >
                            <X size={16} />
                          </button>

                          {/* Divider line */}
                          <div
                            className="absolute top-12 bottom-6 left-1/2 w-px"
                            style={{ background: "var(--color-border)", transform: "translateX(-50%)" }}
                          />

                          {/* ── Card 1: Cybersecurity ── */}
                          <a
                            href="/sai-cybersecurity.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Sai-Kumar-Dungala-Cybersecurity-Resume.pdf"
                            onClick={() => setShowPicker(false)}
                            className="group flex flex-col items-start gap-3 p-7 pt-14 transition-all duration-300 hover:bg-emerald-500/5"
                          >
                            {/* Icon circle */}
                            <div
                              className="flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-300 group-hover:scale-110"
                              style={{
                                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
                                border: "2px solid rgba(16,185,129,0.5)",
                                boxShadow: "0 0 16px rgba(16,185,129,0.2)",
                                color: "#10B981",
                              }}
                            >
                              <Shield size={20} strokeWidth={1.8} />
                            </div>

                            {/* Text */}
                            <div>
                              <p
                                className="text-sm font-bold mb-1.5"
                                style={{
                                  color: "#10B981",
                                  fontFamily: "var(--font-space-grotesk)",
                                  letterSpacing: "0.04em",
                                  textTransform: "uppercase",
                                  fontSize: "11px",
                                }}
                              >
                                Cybersecurity
                              </p>
                              <p
                                className="text-base font-bold mb-2 leading-tight"
                                style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}
                              >
                                Security Resume
                              </p>
                              <p
                                className="text-xs leading-relaxed"
                                style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}
                              >
                                Network security, ethical hacking, vulnerability assessment &amp; penetration testing.
                              </p>
                            </div>

                            {/* Download indicator */}
                            <div
                              className="flex items-center gap-1.5 text-xs font-semibold mt-auto transition-colors group-hover:text-emerald-400"
                              style={{ color: "rgba(16,185,129,0.6)", fontFamily: "var(--font-inter-tight)" }}
                            >
                              <Download size={13} />
                              Download PDF
                            </div>
                          </a>

                          {/* ── Card 2: Full-Stack ── */}
                          <a
                            href="/sairesume-fullstack.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Sai-Kumar-Dungala-FullStack-Resume.pdf"
                            onClick={() => setShowPicker(false)}
                            className="group flex flex-col items-start gap-3 p-7 pt-14 transition-all duration-300 hover:bg-violet-500/5"
                          >
                            {/* Icon circle */}
                            <div
                              className="flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-300 group-hover:scale-110"
                              style={{
                                background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.05))",
                                border: "2px solid rgba(139,92,246,0.5)",
                                boxShadow: "0 0 16px rgba(139,92,246,0.2)",
                                color: "#8B5CF6",
                              }}
                            >
                              <Code2 size={20} strokeWidth={1.8} />
                            </div>

                            {/* Text */}
                            <div>
                              <p
                                className="text-sm font-bold mb-1.5"
                                style={{
                                  color: "#8B5CF6",
                                  fontFamily: "var(--font-space-grotesk)",
                                  letterSpacing: "0.04em",
                                  textTransform: "uppercase",
                                  fontSize: "11px",
                                }}
                              >
                                Full-Stack
                              </p>
                              <p
                                className="text-base font-bold mb-2 leading-tight"
                                style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}
                              >
                                Developer Resume
                              </p>
                              <p
                                className="text-xs leading-relaxed"
                                style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}
                              >
                                React, Node.js, Python, REST APIs, databases &amp; cloud deployment.
                              </p>
                            </div>

                            {/* Download indicator */}
                            <div
                              className="flex items-center gap-1.5 text-xs font-semibold mt-auto transition-colors group-hover:text-violet-400"
                              style={{ color: "rgba(139,92,246,0.6)", fontFamily: "var(--font-inter-tight)" }}
                            >
                              <Download size={13} />
                              Download PDF
                            </div>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
