"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ── Scroll-linked transforms ── */
  // Words drift apart horizontally as user scrolls through
  const aboutX = useTransform(scrollYProgress, [0, 1], ["-3%", "-8%"]);
  const meX    = useTransform(scrollYProgress, [0, 1], ["3%",  "8%"]);

  // Both words drift upward with parallax
  const wordsY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  // Scale up slightly as section enters, back to normal as it leaves
  const scale  = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.94]);

  // Fade in on enter, fade out on exit
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);

  // Blur clears on enter, returns on exit
  const blurVal = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [16, 0, 0, 10]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: "80vh", backgroundColor: "var(--color-bg)" }}
    >
      {/* Centered purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Text row — centered ── */}
      <motion.div
        style={{ opacity, scale, y: wordsY }}
        className="relative z-10 flex items-baseline justify-center select-none w-full px-4"
      >
        {/* ABOUT */}
        <motion.span
          style={{ x: aboutX }}
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "var(--font-inter-tight), var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2.8rem, 9vw, 9rem)",
            letterSpacing: "-0.03em",
            color: "var(--color-text-1)",
            textShadow:
              "0 0 30px rgba(139,92,246,0.15), 0 0 70px rgba(139,92,246,0.07)",
            willChange: "transform",
          }}
        >
          ABOUT
        </motion.span>

        {/* ME? */}
        <motion.span
          style={{ x: meX }}
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase leading-none"
          style={{
            fontFamily: "var(--font-inter-tight), var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2.8rem, 9vw, 9rem)",
            letterSpacing: "-0.03em",
            color: "#8B5CF6",
            textShadow:
              "0 0 35px rgba(139,92,246,0.65), 0 0 90px rgba(139,92,246,0.3), 0 0 180px rgba(139,92,246,0.12)",
            willChange: "transform",
          }}
        >
          ME?
        </motion.span>
      </motion.div>
    </section>
  );
}
