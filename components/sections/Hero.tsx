"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text-1)" }}
    >
      {/* Vertical role label — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="pointer-events-none absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 xl:block xl:left-8"
      >
        <span
          className="text-[11px] font-medium uppercase tracking-[0.35em]"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-inter-tight)",
            color: "var(--color-text-3)",
          }}
        >
          Engineer
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-row items-center gap-3 px-6 pb-8 pt-20 sm:gap-5 sm:px-10 sm:pt-24 sm:pb-10 md:gap-8 lg:gap-12 lg:px-20 lg:pt-32 lg:pb-16">
        {/* Text — left, z-index above portrait */}
        <div className="relative z-20 flex min-w-0 flex-col justify-center" style={{ maxWidth: "clamp(280px, 48%, 600px)" }}>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:mb-2 sm:text-xs sm:tracking-[0.25em] md:text-sm"
            style={{
              color: "var(--color-accent-cyan)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Namaste(); I&apos;m
          </motion.p>

          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="mb-0.5 sm:mb-1">
            <h1
              className="leading-none"
              style={{
                fontFamily: "var(--font-dancing-script), cursive",
                fontWeight: 700,
                fontSize: "clamp(2rem, 8vw, 10rem)",
                color: "var(--color-text-1)",
                lineHeight: 1.0,
              }}
            >
              Sai Kumar
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="mb-2 sm:mb-4 md:mb-5">
            <div
              className="mb-2 h-px w-full max-w-[140px] sm:mb-3 sm:max-w-xs"
              style={{ background: "linear-gradient(90deg, var(--color-border), transparent)" }}
            />
            <span
              className="font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.35em]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(0.75rem, 2.8vw, 1.6rem)",
                background:
                  "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Dungala
            </span>
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-2 text-[10px] font-semibold leading-snug sm:mb-4 sm:text-xs md:text-sm"
            style={{
              color: "var(--color-text-3)",
              fontFamily: "var(--font-space-grotesk)",
              letterSpacing: "0.04em",
            }}
          >
            Cybersecurity Engineer · Full-Stack Developer
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hidden max-w-xl text-sm leading-relaxed sm:block sm:text-base sm:leading-7"
            style={{
              color: "var(--color-text-2)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Crafting secure digital products with a focus on vulnerability research,
            elegant systems, and high-performance web experiences.
          </motion.p>

          {/* Scroll hint — mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-4 flex items-center gap-4 sm:mt-6 lg:hidden"
          >
            <button
              type="button"
              onClick={scrollToAbout}
              className="group flex items-center gap-2 text-xs transition-colors sm:text-sm"
              style={{
                color: "var(--color-text-3)",
                fontFamily: "var(--font-inter-tight)",
              }}
            >
              <span>Scroll down</span>
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </motion.div>
        </div>

        {/* Portrait — smaller, centered vertically, right-anchored */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute pointer-events-none"
          style={{
            right: 0,
            top: "20%",
            transform: "translateY(50%)",
            width: "clamp(260px, 58vw, 560px)",
            height: "clamp(360px, 70vh, 680px)",
            zIndex: 5,
          }}
        >
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "12%", background: "linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{ height: "18%", background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)" }} />
          {/* Left fade */}
          <div className="absolute top-0 left-0 bottom-0 z-10 pointer-events-none"
            style={{ width: "22%", background: "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)" }} />
          {/* Right fade */}
          <div className="absolute top-0 right-0 bottom-0 z-10 pointer-events-none"
            style={{ width: "8%", background: "linear-gradient(to right, transparent 0%, var(--color-bg) 100%)" }} />
          <Image
            src="/saikumar.png"
            alt="Sai Kumar Dungala"
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "grayscale(100%) contrast(1.08) brightness(0.97)" }}
            sizes="(max-width: 768px) 260px, 38vw"
          />
        </motion.div>
      </div>

      {/* Scroll hint — desktop */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 left-6 z-20 hidden items-end gap-5 lg:flex lg:left-20"
      >
        <span
          className="text-sm font-medium tracking-[0.2em]"
          style={{
            color: "var(--color-text-3)",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-inter-tight)",
          }}
        >
          2026
        </span>

        <button
          type="button"
          onClick={scrollToAbout}
          className="group flex items-center gap-2 text-sm transition-colors"
          style={{
            color: "var(--color-text-3)",
            fontFamily: "var(--font-inter-tight)",
          }}
        >
          <span>Scroll down</span>
          <span className="transition-transform duration-300 group-hover:translate-y-0.5">
            ↓
          </span>
        </button>
      </motion.div>
    </section>
  );
}
