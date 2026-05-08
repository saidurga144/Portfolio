"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { Linkedin, Mail, Github, Globe, MapPin, Briefcase, Phone, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const pills = ["Hunting real-world vulnerabilities with cybersecurity", "Creating AI-powered solutions", "Building modern web experiences", "Solving real-world problems with technology"];

const ChevronDownIcon = () => (<ChevronDown width={20} height={20} />);

/* ── Social bar items ── */
const socialItems = [
  { icon: <Phone size={17} />,    href: "tel:+917396295445",                                  label: "Phone",     featured: false },
  { icon: <Mail size={17} />,     href: "mailto:saikumard912@gmail.com",                       label: "Email",     featured: false },
  { icon: null,                   href: "",                                                     label: "divider",   featured: false },
  { icon: <Linkedin size={17} />, href: "https://linkedin.com/in/sai-kumar-dungala-393538289", label: "LinkedIn",  featured: false },
  { icon: <Github size={17} />,   href: "https://github.com/saidurga144",                      label: "GitHub",    featured: false },
  { icon: <Globe size={17} />,    href: "https://saikumar-dungala.vercel.app",                 label: "Portfolio", featured: true  },
];

function SocialBar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="inline-flex items-center gap-1 px-3 py-2.5 rounded-2xl"
      style={{
        background: "rgba(15,15,25,0.85)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {socialItems.map((item, i) => {
        /* Divider */
        if (item.label === "divider") {
          return (
            <div
              key="divider"
              className="w-px h-5 mx-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)" }}
            />
          );
        }

        const isHovered = hovered === item.label;

        /* Featured pill (Portfolio) — icon only by default, expands with label on hover */
        if (item.featured) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center rounded-xl font-semibold text-sm overflow-hidden"
              style={{
                gap: isHovered ? "8px" : "0px",
                paddingLeft: isHovered ? "16px" : "10px",
                paddingRight: isHovered ? "16px" : "10px",
                paddingTop: "8px",
                paddingBottom: "8px",
                width: isHovered ? "auto" : "36px",
                maxWidth: isHovered ? "160px" : "36px",
                background: isHovered
                  ? "linear-gradient(135deg, #06B6D4, #8B5CF6)"
                  : "rgba(139,92,246,0.2)",
                border: "1px solid rgba(139,92,246,0.5)",
                color: isHovered ? "#fff" : "#a78bfa",
                fontFamily: "var(--font-dm-sans)",
                boxShadow: isHovered ? "0 0 20px rgba(139,92,246,0.4)" : "none",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                whiteSpace: "nowrap",
              }}
            >
              {item.icon}
              <span
                style={{
                  maxWidth: isHovered ? "100px" : "0px",
                  opacity: isHovered ? 1 : 0,
                  overflow: "hidden",
                  transition: "max-width 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
                  display: "inline-block",
                }}
              >
                {item.label}
              </span>
            </a>
          );
        }

        /* Regular icon button */
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={item.label}
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
            style={{
              color: isHovered ? "#06B6D4" : "rgba(255,255,255,0.6)",
              background: isHovered ? "rgba(6,182,212,0.12)" : "transparent",
              border: isHovered ? "1px solid rgba(6,182,212,0.3)" : "1px solid transparent",
            }}
          >
            {item.icon}
          </a>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

        {/* LEFT */}
        <div className="flex-1 lg:pr-10">

          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="text-sm font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-space-grotesk)" }}>
            Namaste(); I&apos;m
          </motion.p>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="mb-1">
            <h1 className="leading-none"
              style={{ fontFamily: "var(--font-dancing-script), cursive", fontWeight: 700,
                fontSize: "clamp(4rem, 11vw, 10rem)", color: "var(--color-text-1)", lineHeight: 1.0 }}>
              Sai Kumar
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="mb-5">
            <div className="h-px w-full max-w-xs mb-3"
              style={{ background: "linear-gradient(90deg, var(--color-border), transparent)" }} />
            <span className="font-bold tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Dungala
            </span>
          </motion.div>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="show"
            className="text-sm font-semibold mb-4"
            style={{ color: "var(--color-text-3)", fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.05em" }}>
            Cybersecurity Engineer · Full-Stack Developer
          </motion.p>

          {/* Skill pills */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-2 mb-6">
            {pills.map((p, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
                  color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                {p}
              </span>
            ))}
          </motion.div>

          {/* Info cards */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: <MapPin size={12} />,    label: "Location",  value: "India",                                        accent: "var(--color-accent-cyan)" },
              { icon: <Briefcase size={12} />, label: "Expertise", value: "Cybersecurity Engineer and Full-Stack Developer", accent: "var(--color-accent-purple)" },
              { icon: <Phone size={12} />,     label: "Contact",   value: "+91-7396295445",                               accent: "var(--color-accent-cyan)" },
            ].map((card) => (
              <div key={card.label} className="flex flex-col gap-0.5 px-4 py-3 rounded-xl min-w-[130px]"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: card.accent, fontFamily: "var(--font-space-grotesk)" }}>
                  <ThemedIcon size={20} accentColor={card.accent}>
                    {card.icon}
                  </ThemedIcon>{card.label}
                </span>
                <span className="text-xs" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                  {card.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap items-center gap-4 mb-6">
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
                boxShadow: "0 0 24px rgba(6,182,212,0.25)", fontFamily: "var(--font-dm-sans)" }}>
              Let&apos;s Connect →
            </button>
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-3)",
                fontFamily: "var(--font-dm-sans)" }}>
              View Projects
            </button>
          </motion.div>

          {/* Social bar */}
          <motion.div custom={7} variants={fadeUp} initial="hidden" animate="show">
            <SocialBar />
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
              filter: "blur(40px)", transform: "scale(1.3)" }} />
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-[340px] lg:h-[440px] rounded-3xl overflow-hidden"
            style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
            <Image src="/home .jpeg" alt="Sai Kumar Dungala" fill className="object-cover object-top" priority />
            <div className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)" }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--color-text-3)" }}>
          <ChevronDownIcon />
        </motion.div>
      </motion.div>
    </section>
  );
}
