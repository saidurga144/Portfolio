"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { SpiderCursor } from "@/components/ui/spider-cursor";
import { RocketLoader } from "@/components/ui/rocket-loader";

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
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  const [stars,     setStars]     = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [phase,     setPhase]     = useState(0);
  const [exiting,   setExiting]   = useState(false);

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
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 2300);
    const t3 = setTimeout(() => setPhase(3), 2700);
    const t4 = setTimeout(() => setPhase(4), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  /* ── Progress counter — replaced with direct enter after TO MY WORLD reveal ── */
  const progressStarted = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (phase < 3 || progressStarted.current) return;
    progressStarted.current = true;
    // Wait for "TO MY WORLD" left-to-right wipe to finish (delay 0.7 + duration 1.2 = ~2s), then enter
    const timer = setTimeout(() => {
      handleEnterRef.current();
    }, 2100);
    return () => clearTimeout(timer);
  }, [phase]);

  /* ── exit ── */
  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(onEnter, 900);
  }, [onEnter]);

  const handleEnterRef = useRef(handleEnter);
  handleEnterRef.current = handleEnter;

  /* ── shared styles ── */
  const welcomeStyle: React.CSSProperties = {
    fontFamily: "var(--font-dancing-script), cursive",
    fontWeight: 700,
    color: isDark ? "#ffffff" : "var(--color-text-1)",
    letterSpacing: "0.02em",
    lineHeight: 1,
    fontSize: "clamp(3.5rem, 10vw, 9rem)",
    fontStyle: "italic",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textShadow: isDark
      ? [
          "0 0 12px rgba(255,255,255,1)",
          "0 0 30px rgba(255,255,255,0.95)",
          "0 0 60px rgba(255,255,255,0.7)",
          "0 0 100px rgba(220,240,255,0.5)",
          "0 0 180px rgba(180,220,255,0.3)",
          "0 0 300px rgba(140,200,255,0.15)",
          "0 0 500px rgba(6,182,212,0.08)",
        ].join(", ")
      : [
          "0 0 12px rgba(10,122,143,0.3)",
          "0 0 30px rgba(10,122,143,0.2)",
          "0 0 60px rgba(107,63,170,0.12)",
        ].join(", "),
    filter: isDark
      ? "drop-shadow(0 0 18px rgba(255,255,255,0.55)) drop-shadow(0 0 60px rgba(200,230,255,0.25))"
      : "drop-shadow(0 0 18px rgba(10,122,143,0.2)) drop-shadow(0 0 60px rgba(107,63,170,0.1))",
    willChange: "transform, opacity, filter",
  };

  const subheadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-space-grotesk), sans-serif",
    fontWeight: 500,
    color: isDark ? "#ffffff" : "var(--color-text-1)",
    letterSpacing: "0.35em",
    lineHeight: 1,
    fontSize: "clamp(0.75rem, 2vw, 1.5rem)",
    textTransform: "uppercase",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textShadow: isDark
      ? "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)"
      : "0 0 20px rgba(10,122,143,0.25), 0 0 40px rgba(46,42,37,0.15)",
    filter: isDark
      ? "drop-shadow(0 0 10px rgba(255,255,255,0.3))"
      : "drop-shadow(0 0 10px rgba(10,122,143,0.15))",
    willChange: "transform, opacity, filter",
  };

  const subStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    color: isDark ? "rgba(255,255,255,0.45)" : "rgba(46,42,37,0.55)",
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
          className="fixed inset-0 z-[9999] overflow-hidden cursor-none transition-colors duration-500"
          style={{ backgroundColor: isDark ? "#000000" : "var(--color-bg)" }}
        >
          {/* Spider cursor throughout the entire landing page */}
          <SpiderCursor />

          {/* Rocket loader — large centered display during phase 0, fades as flare fires */}
          <RocketLoader visible={phase === 0} />

          {/* Clouds — drift across screen during phase 0 */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div
                key="clouds"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none z-[8]"
              >
                <div className="rocket-clouds" style={{ animation: "moveClouds 14s linear infinite" }}>
                  <div className="rocket-cloud rocket-cloud1" />
                  <div className="rocket-cloud rocket-cloud2" />
                  <div className="rocket-cloud rocket-cloud3" />
                  <div className="rocket-cloud rocket-cloud4" />
                  <div className="rocket-cloud rocket-cloud5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ── Parallax depth layer ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ x: px, y: py }}
          >
            {/* ── Ambient radial glow ── */}
            <div className="absolute inset-0"
              style={{
                background: isDark
                  ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(10,122,143,0.08) 0%, transparent 70%)",
              }}
            />

            {/* ── Stars ── */}
            {stars.map((s) => (
              <motion.div key={s.id}
                className={`absolute rounded-full ${isDark ? "bg-white" : "bg-neutral-400"}`}
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
                    background: isDark ? "rgba(6,182,212,0.7)" : "rgba(10,122,143,0.7)",
                    boxShadow: isDark ? "0 0 4px rgba(6,182,212,0.8)" : "0 0 4px rgba(10,122,143,0.5)",
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
              DESKTOP LAYOUT  (lg+)
          ══════════════════════════════════════════════ */}
          <div className="hidden lg:flex absolute inset-0 z-[10] flex-col items-center justify-center px-6 xl:px-12">

            {/* ── Smiley face above title ── */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.7, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center justify-center"
              style={{
                color: isDark ? "rgba(255,255,255,0.9)" : "var(--color-text-1)",
                filter: isDark
                  ? "drop-shadow(0 0 12px rgba(255,255,255,0.5)) drop-shadow(0 0 30px rgba(255,255,255,0.2))"
                  : "drop-shadow(0 0 12px rgba(10,122,143,0.25)) drop-shadow(0 0 30px rgba(10,122,143,0.1))",
              }}
            >
              <SmileyIcon />
            </motion.div>

            {/* ── Title — two-part typography ── */}
            <div className="text-center select-none flex flex-col items-center gap-2">
              {/* "Welcome" in script — always visible from load */}
              <motion.h1
                initial={{ opacity: 0, y: 60, scale: 0.85, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={welcomeStyle}
              >
                Welcome
              </motion.h1>

              {/* "TO MY WORLD" text — always visible, rocket launches away on phase 3 */}
              <motion.p
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={phase >= 3
                  ? { opacity: 0, clipPath: "inset(0 100% 0 0)" }
                  : { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                }
                transition={{ duration: phase >= 3 ? 0.4 : 1.2, delay: phase >= 3 ? 0 : 0.8, ease: [0.77, 0, 0.175, 1] }}
                style={subheadingStyle}
              >
                TO MY WORLD
              </motion.p>
            </div>


            {/* ── System ready — auto-enters at 100% ── */}
            <AnimatePresence>
              {false && (
                <motion.div className="mt-10 flex flex-col items-center" />
              )}
            </AnimatePresence>
          </div>

          {/* ══════════════════════════════════════════════
              MOBILE / TABLET LAYOUT  (below lg) — horizontal, no rotation
          ══════════════════════════════════════════════ */}
          <div className="flex lg:hidden absolute inset-0 z-[10] min-h-[100dvh] flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">

            {/* Top row — version + smiley */}
            <div className="relative z-20 flex shrink-0 items-start justify-end gap-2.5 pr-0.5">
              <motion.div
                initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  color: isDark ? "rgba(255,255,255,0.9)" : "var(--color-text-1)",
                  filter: isDark
                    ? "drop-shadow(0 0 10px rgba(255,255,255,0.45))"
                    : "drop-shadow(0 0 10px rgba(10,122,143,0.2))",
                }}
              >
                <SmileyIcon />
              </motion.div>
              <span
                className="pt-1 text-[10px] tracking-[0.12em] sm:text-[11px]"
                style={{ ...subStyle, fontSize: undefined, color: isDark ? "rgba(6,182,212,0.35)" : "rgba(10,122,143,0.55)" }}
              >
                v1.0 · 2025
              </span>
            </div>

            {/* Center — title + horizontal loading */}
            <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-2 py-4 text-center">
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <motion.h1
                  initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="select-none"
                  style={{
                    ...welcomeStyle,
                    fontSize: "clamp(3rem, 12vw, 5.5rem)",
                  }}
                >
                  Welcome
                </motion.h1>

                {/* TO MY WORLD — always visible, wipes away on phase 3 */}
                <motion.p
                  initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                  animate={phase >= 3
                    ? { opacity: 0, clipPath: "inset(0 100% 0 0)" }
                    : { opacity: 1, clipPath: "inset(0 0% 0 0)" }
                  }
                  transition={{ duration: phase >= 3 ? 0.4 : 1.2, delay: phase >= 3 ? 0 : 0.8, ease: [0.77, 0, 0.175, 1] }}
                  className="select-none"
                  style={{
                    ...subheadingStyle,
                    fontSize: "clamp(0.65rem, 2.5vw, 0.95rem)",
                    letterSpacing: "0.3em",
                  }}
                >
                  TO MY WORLD
                </motion.p>
              </div>



              <AnimatePresence>
                {false && <motion.div />}
              </AnimatePresence>
            </div>

            {/* Bottom row */}
            <div className="relative z-20 shrink-0 pb-0.5">
              <span
                className="text-[10px] tracking-[0.08em]"
                style={{ ...subStyle, fontSize: undefined, color: isDark ? "rgba(255,255,255,0.12)" : "rgba(46,42,37,0.2)" }}
              >
                Portfolio · OS
              </span>
            </div>
          </div>

          {/* ── HUD corner brackets ── */}
          {(["top-4 left-4 sm:top-5 sm:left-5", "top-4 right-4 sm:top-5 sm:right-5 rotate-90", "bottom-4 left-4 sm:bottom-5 sm:left-5 -rotate-90", "bottom-4 right-4 sm:bottom-5 sm:right-5 rotate-180"] as const).map((pos, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className={`absolute ${pos} pointer-events-none z-[5]`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0 7 L0 0 L7 0" stroke={isDark ? "rgba(6,182,212,0.2)" : "rgba(10,122,143,0.3)"} strokeWidth="1" />
              </svg>
            </motion.div>
          ))}

          {/* ── System labels (desktop only — mobile uses in-layout labels) ── */}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-5 right-12 z-[10] pointer-events-none hidden lg:block"
            style={{ ...subStyle, fontSize: "0.6rem", color: isDark ? "rgba(6,182,212,0.25)" : "rgba(10,122,143,0.45)" }}
          >
            v1.0 · 2025
          </motion.span>

          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-5 left-12 z-[10] pointer-events-none hidden lg:block"
            style={{ ...subStyle, fontSize: "0.6rem", color: isDark ? "rgba(255,255,255,0.1)" : "rgba(46,42,37,0.2)" }}
          >
            Portfolio · OS
          </motion.span>

          {/* ── Name tag ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: phase >= 4 ? 0.3 : 99 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 pointer-events-none z-[10]"
          >
            <div className="h-5 w-px" style={{ background: isDark ? "linear-gradient(to bottom, transparent, rgba(6,182,212,0.3))" : "linear-gradient(to bottom, transparent, rgba(10,122,143,0.3))" }} />
            <span style={{ ...subStyle, fontSize: "0.6rem", color: isDark ? "rgba(255,255,255,0.15)" : "rgba(46,42,37,0.3)" }}>
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
          style={{ background: isDark ? "#06B6D4" : "var(--color-accent-cyan)" }}
        />
      )}
    </AnimatePresence>
  );
}
