"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { TidalCursor } from "@/components/ui/tidal-cursor";

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
interface Star   { id: number; x: number; y: number; size: number; opacity: number; duration: number; delay: number; }
interface Particle { id: number; x: number; y: number; size: number; opacity: number; duration: number; delay: number; angle: number; dist: number; }

/* ─────────────────────────────────────────────────────────
   GENERATORS  (client-only)
───────────────────────────────────────────────────────── */
function genStars(n: number): Star[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.4 + 0.3,
    opacity: Math.random() * 0.35 + 0.05,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 8,
  }));
}

function genParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
    angle: Math.random() * 360,
    dist: Math.random() * 30 + 10,
  }));
}

/* ─────────────────────────────────────────────────────────
   GLOBE ICON
───────────────────────────────────────────────────────── */
const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#06B6D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="4" ry="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const SmileyIcon = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none"
    stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="45" />
    <line x1="35" y1="40" x2="35" y2="45" />
    <line x1="65" y1="40" x2="65" y2="45" />
    <path d="M 30 60 Q 50 75 70 60" fill="none" />
  </svg>
);

/* ─────────────────────────────────────────────────────────
   ANIMATION PHASES
   0 → dark + stars + gathering particles
   1 → flare burst
   2 → flash white
   3 → title reveal + scanner
   4 → fully settled (enter button visible)
───────────────────────────────────────────────────────── */

export function CinematicLanding({ onEnter }: { onEnter: () => void }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  const [stars,     setStars]     = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [phase,     setPhase]     = useState(0);   // 0→1→2→3→4
  const [exiting,   setExiting]   = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  /* parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px   = useSpring(rawX, { stiffness: 30, damping: 20 });
  const py   = useSpring(rawY, { stiffness: 30, damping: 20 });

  /* ── client-only data ── */
  useEffect(() => {
    setStars(genStars(80));
    setParticles(genParticles(40));
  }, []);

  /* ── parallax mouse ── */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 18);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  /* ── phase timeline ── */
  useEffect(() => {
    // phase 0 → 1 (flare) at 1.8 s
    const t1 = setTimeout(() => setPhase(1), 1800);
    // phase 1 → 2 (flash) at 2.3 s
    const t2 = setTimeout(() => setPhase(2), 2300);
    // phase 2 → 3 (title) at 2.7 s
    const t3 = setTimeout(() => setPhase(3), 2700);
    // phase 3 → 4 (settled) at 5.2 s
    const t4 = setTimeout(() => setPhase(4), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  /* ── GSAP scan line (fires when phase reaches 3) ── */
  useEffect(() => {
    if (phase < 3 || !lineRef.current || !dotRef.current) return;
    const lineEl = lineRef.current;
    const dotEl  = dotRef.current;
    let killed = false;
    // eslint-disable-next-line
    let tl: any = null;

    import("gsap").then((mod) => {
      if (killed) return;
      // eslint-disable-next-line
      const g = (mod as any).gsap ?? (mod as any).default ?? mod;
      tl = g.timeline({ delay: 0.6 });
      tl.fromTo(lineEl,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 2.2, ease: "power2.inOut",
          onComplete: () => setShowEnter(true) }
      );
      tl.fromTo(dotEl,
        { x: 0, opacity: 0 },
        { x: "calc(100% - 5px)", opacity: 1, duration: 2.2, ease: "power2.inOut" },
        "<"
      );
    });
    return () => { killed = true; tl?.kill(); };
  }, [phase]);

  /* ── exit ── */
  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(onEnter, 900);
  }, [onEnter]);

  /* ── shared styles ── */
  const welcomeStyle: React.CSSProperties = {
    fontFamily: "var(--font-dancing-script), cursive",
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "0.02em",
    lineHeight: 1,
    fontSize: "clamp(3.5rem, 10vw, 9rem)",
    fontStyle: "italic",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textShadow: [
      "0 0 12px rgba(255,255,255,1)",
      "0 0 30px rgba(255,255,255,0.95)",
      "0 0 60px rgba(255,255,255,0.7)",
      "0 0 100px rgba(220,240,255,0.5)",
      "0 0 180px rgba(180,220,255,0.3)",
      "0 0 300px rgba(140,200,255,0.15)",
      "0 0 500px rgba(6,182,212,0.08)",
    ].join(", "),
    filter:
      "drop-shadow(0 0 18px rgba(255,255,255,0.55)) drop-shadow(0 0 60px rgba(200,230,255,0.25))",
    willChange: "transform, opacity, filter",
  };

  const subheadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    fontWeight: 500,
    color: "#ffffff",
    letterSpacing: "0.35em",
    lineHeight: 1,
    fontSize: "clamp(0.75rem, 2vw, 1.5rem)",
    textTransform: "uppercase",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
    willChange: "transform, opacity, filter",
  };

  const subStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.08em",
    fontSize: "1.4rem",
  };

  /* ─────────────────────────────────────────────────────
     LETTER-BY-LETTER stagger for the heading
  ───────────────────────────────────────────────────── */
  const TITLE = "WELCOME TO MY WORLD";
  const letters = TITLE.split("");

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="cinematic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden cursor-none"
          style={{ background: "#000000" }}
        >
          <TidalCursor />
          {/* dot cursor on top of ripples */}
          <CustomCursor />

          {/* ── Parallax depth layer ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ x: px, y: py }}
          >
            {/* ── Ambient radial glow ── */}
            <div className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)",
              }}
            />

            {/* ── Stars ── */}
            {stars.map((s) => (
              <motion.div key={s.id}
                className="absolute rounded-full bg-white"
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
                animate={{ opacity: [0, s.opacity, 0] }}
                transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>

          {/* ── Gathering particles (phase 0 only) ── */}
          <AnimatePresence>
            {phase === 0 && particles.map((p) => {
              const cx = 50 + Math.cos((p.angle * Math.PI) / 180) * p.dist;
              const cy = 50 + Math.sin((p.angle * Math.PI) / 180) * p.dist;
              return (
                <motion.div key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${p.x}%`, top: `${p.y}%`,
                    width: p.size, height: p.size,
                    background: "rgba(6,182,212,0.7)",
                    boxShadow: "0 0 4px rgba(6,182,212,0.8)",
                  }}
                  animate={{
                    left: [`${p.x}%`, `${cx}%`],
                    top:  [`${p.y}%`, `${cy}%`],
                    opacity: [0, p.opacity, p.opacity * 0.6],
                    scale: [0.5, 1.2, 0.8],
                  }}
                  transition={{ duration: p.duration, delay: p.delay, ease: "easeInOut" }}
                />
              );
            })}
          </AnimatePresence>

          {/* ── Flare burst (phase 1) ── */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                key="flare"
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-[20]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Core bright dot */}
                <motion.div
                  className="rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 0.8], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: 12, height: 12,
                    background: "#ffffff",
                    boxShadow:
                      "0 0 40px 20px rgba(255,255,255,0.9), 0 0 100px 50px rgba(200,240,255,0.5), 0 0 200px 100px rgba(6,182,212,0.3)",
                  }}
                />
                {/* Lens bloom rings */}
                {[80, 160, 280].map((size, i) => (
                  <motion.div key={i}
                    className="absolute rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1], opacity: [0, 0.15 - i * 0.04, 0] }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                    style={{
                      width: size, height: size,
                      border: "1px solid rgba(6,182,212,0.6)",
                      boxShadow: `0 0 ${size / 4}px rgba(6,182,212,0.3)`,
                    }}
                  />
                ))}
                {/* Horizontal lens streak */}
                <motion.div
                  className="absolute"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 0.6], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    width: "60vw", height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                    filter: "blur(1px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Flash white (phase 2) ── */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                key="flash"
                className="absolute inset-0 z-[30] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,240,255,1) 0%, rgba(6,182,212,0.3) 60%, transparent 100%)" }}
              />
            )}
          </AnimatePresence>

          {/* ══════════════════════════════════════════════
              DESKTOP LAYOUT  (md+)
          ══════════════════════════════════════════════ */}
          <div className="hidden md:flex absolute inset-0 z-[10] flex-col items-center justify-center px-6 lg:px-12">

            {/* ── Smiley face above title ── */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.7, filter: "blur(10px)" }}
              animate={phase >= 3
                ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, y: -20, scale: 0.7, filter: "blur(10px)" }
              }
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center justify-center"
              style={{
                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(255,255,255,0.2))",
              }}
            >
              <SmileyIcon />
            </motion.div>

            {/* ── Title — two-part typography ── */}
            <div className="text-center select-none flex flex-col items-center gap-2">
              {/* "Welcome" in script */}
              <motion.h1
                initial={{ opacity: 0, y: 60, scale: 0.85, filter: "blur(20px)" }}
                animate={phase >= 3
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: 60, scale: 0.85, filter: "blur(20px)" }
                }
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={welcomeStyle}
              >
                Welcome
              </motion.h1>

              {/* "TO MY WORLD" in uppercase sans */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={phase >= 3
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 20, filter: "blur(10px)" }
                }
                transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={subheadingStyle}
              >
                TO MY WORLD
              </motion.p>
            </div>

            {/* ── Globe + scan line ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-3 w-full max-w-xl"
            >
              {/* Globe */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative shrink-0 flex items-center justify-center"
              >
                <div className="absolute rounded-full"
                  style={{ width: 26, height: 26,
                    background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
                    filter: "blur(4px)" }}
                />
                <GlobeIcon />
              </motion.div>

              {/* Scan line */}
              <div className="relative flex-1 h-px">
                <div className="absolute inset-0" style={{ background: "rgba(6,182,212,0.08)" }} />
                <div ref={lineRef} className="absolute top-0 left-0 h-full w-full"
                  style={{
                    background: "linear-gradient(90deg, rgba(6,182,212,0.2) 0%, #06B6D4 60%, #67E8F9 100%)",
                    boxShadow: "0 0 8px 2px rgba(6,182,212,0.6), 0 0 20px 4px rgba(6,182,212,0.2)",
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                  }}
                />
                <div ref={dotRef} className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 5, height: 5,
                    background: "#67E8F9",
                    boxShadow: "0 0 6px 2px rgba(6,182,212,1), 0 0 14px 4px rgba(6,182,212,0.5)",
                    opacity: 0,
                  }}
                />
              </div>
            </motion.div>

            {/* ── "Going global..." ── */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-center"
              style={subStyle}
            >
              Going global...
            </motion.p>

            {/* ── System ready + Enter button ── */}
            <AnimatePresence>
              {showEnter && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mt-10 flex flex-col items-center gap-5"
                >
                  <p className="text-[13px] tracking-[0.5em] uppercase"
                    style={{ color: "rgba(6,182,212,0.4)", fontFamily: "var(--font-dm-sans)" }}>
                    System ready
                  </p>

                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    onClick={handleEnter}
                    className="group relative"
                  >
                    <span className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: "0 0 16px 3px rgba(6,182,212,0.3)", border: "1px solid rgba(6,182,212,0.4)", borderRadius: 4 }}
                    />
                    <span
                      className="relative flex items-center gap-2.5 px-7 py-2.5 text-[14px] tracking-[0.4em] uppercase transition-colors duration-300 group-hover:text-white"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.02)",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                    >
                      Enter Portfolio
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ color: "#06B6D4" }}
                      >→</motion.span>
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══════════════════════════════════════════════
              MOBILE LAYOUT  (below md)
          ══════════════════════════════════════════════ */}
          <div className="flex md:hidden absolute inset-0 z-[10]">

            {/* Vertical scan line — center */}
            <div className="absolute left-[40%] top-0 bottom-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="flex flex-col items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute rounded-full"
                    style={{ width: 24, height: 24, background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)", filter: "blur(3px)" }}
                  />
                  <GlobeIcon />
                </motion.div>

                <div className="relative h-44" style={{ width: 1 }}>
                  <div className="absolute inset-0" style={{ background: "rgba(6,182,212,0.07)" }} />
                  <div ref={lineRef} className="absolute top-0 left-0 w-full h-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(6,182,212,0.1) 0%, #06B6D4 70%, #67E8F9 100%)",
                      boxShadow: "0 0 6px 2px rgba(6,182,212,0.5)",
                      transformOrigin: "top center",
                      transform: "scaleY(0)",
                    }}
                  />
                  <div ref={dotRef} className="absolute left-1/2 -translate-x-1/2 rounded-full"
                    style={{ width: 5, height: 5, background: "#67E8F9", boxShadow: "0 0 6px 2px rgba(6,182,212,1)", opacity: 0 }}
                  />
                </div>

                <span style={{ ...subStyle, fontSize: "0.65rem", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                  Going global...
                </span>
              </motion.div>
            </div>

            {/* Rotated heading */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-3">
              <div className="flex flex-col items-center gap-4">
                {/* Smiley — mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                  animate={phase >= 3 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.45))",
                    writingMode: "horizontal-tb",
                    transform: "none",
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 100 100" fill="none"
                    stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="50" cy="50" r="45" />
                    <line x1="35" y1="40" x2="35" y2="45" />
                    <line x1="65" y1="40" x2="65" y2="45" />
                    <path d="M 30 60 Q 50 75 70 60" fill="none" />
                  </svg>
                </motion.div>

                {/* Two-part title — vertical */}
                <div className="flex flex-col items-center gap-2">
                  <motion.h1
                    initial={{ opacity: 0, x: 40, filter: "blur(16px)" }}
                    animate={phase >= 3 ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="select-none"
                    style={{
                      ...welcomeStyle,
                      fontSize: "clamp(2.5rem, 9vw, 5rem)",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    Welcome
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    animate={phase >= 3 ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="select-none"
                    style={{
                      ...subheadingStyle,
                      fontSize: "clamp(0.5rem, 1.5vw, 0.9rem)",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    TO MY WORLD
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Mobile enter button */}
            <AnimatePresence>
              {showEnter && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  onClick={handleEnter}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                  <span className="flex items-center gap-2 px-5 py-2.5 text-[13px] tracking-[0.4em] uppercase"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.02)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    Enter Portfolio
                    <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
                      style={{ color: "#06B6D4" }}>→</motion.span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* ── HUD corner brackets ── */}
          {(["top-5 left-5", "top-5 right-5 rotate-90", "bottom-5 left-5 -rotate-90", "bottom-5 right-5 rotate-180"] as const).map((pos, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className={`absolute ${pos} pointer-events-none z-[5]`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0 7 L0 0 L7 0" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
              </svg>
            </motion.div>
          ))}

          {/* ── System labels ── */}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-5 right-12 z-[10] pointer-events-none"
            style={{ ...subStyle, fontSize: "0.6rem", color: "rgba(6,182,212,0.25)" }}
          >
            v1.0 · 2025
          </motion.span>

          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-5 left-12 z-[10] pointer-events-none"
            style={{ ...subStyle, fontSize: "0.6rem", color: "rgba(255,255,255,0.1)" }}
          >
            Portfolio · OS
          </motion.span>

          {/* ── Name tag ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: phase >= 4 ? 0.3 : 99 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 pointer-events-none z-[10]"
          >
            <div className="h-5 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.3))" }} />
            <span style={{ ...subStyle, fontSize: "0.6rem", color: "rgba(255,255,255,0.15)" }}>
              Sai Kumar Dungala
            </span>
          </motion.div>

          {/* ── Exit flash ── */}
        </motion.div>
      ) : (
        <motion.div key="exit-flash"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{ background: "#06B6D4" }}
        />
      )}
    </AnimatePresence>
  );
}
