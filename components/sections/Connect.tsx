"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function Connect() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="connect"
      ref={ref}
      className="py-28 overflow-hidden relative transition-colors duration-500"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 relative">
        

        {/* LET'S CONNECT Subheader with horizontal line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
          style={{ color: "var(--color-text-3)" }}
        >
          <div className="h-[1px] w-8 bg-current opacity-40" />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            LET&apos;S CONNECT
          </span>
        </motion.div>

        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2
            className="leading-[1.05] flex flex-col"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.8rem)",
              fontFamily: "var(--font-dancing-script), cursive",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "var(--color-text-1)" }}>Let&apos;s create</span>
            <span
              style={{
                color: "var(--color-text-3)",
                fontStyle: "italic",
              }}
            >
              something
            </span>
            <span style={{ color: "var(--color-accent-cyan)" }}>meaningful.</span>
          </h2>
        </motion.div>

        {/* Description body */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg max-w-xl mb-16 leading-relaxed"
          style={{
            color: "var(--color-text-2)",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Have a project in mind, want to collaborate, or just want to say hello?
          I&apos;m always open to thoughtful conversations about design and craft.
        </motion.p>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-8 sm:gap-14 items-center"
        >
          <a
            href="https://wa.me/917396295445"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 font-bold text-xs uppercase tracking-[0.22em] relative py-1.5 cursor-none"
            style={{
              color: "var(--color-text-1)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {/* Pencil-on-paper edit icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-12deg] group-hover:scale-110"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>WHATSAPP ME</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href="mailto:saikumard912@gmail.com"
            className="group flex items-center gap-3 font-bold text-xs uppercase tracking-[0.22em] relative py-1.5 cursor-none"
            style={{
              color: "var(--color-text-1)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70 transition-transform duration-300 group-hover:scale-110"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>SEND EMAIL</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        </motion.div>
        
      </div>
    </section>
  );
}
