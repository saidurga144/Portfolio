"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const bioLines = [
  "I'm Sai, a passionate Full Stack Developer and Cybersecurity enthusiast focused on building scalable, secure, and user-centered digital solutions.",
  "I enjoy transforming complex ideas into functional, impactful applications while constantly pushing my technical limits. From developing web applications and real-time delivery platforms to working on phishing detection systems, I thrive on solving real-world problems through technology.",
  "My interests extend across full-stack development, cybersecurity, and UI/UX design — creating experiences that are fast, reliable, and visually engaging.",
  "I believe great products are built through continuous learning, experimentation, and attention to detail.",
]

interface AboutInfoCardProps {
  className?: string
  inView?: boolean
}

export function AboutInfoCard({ className, inView = true }: AboutInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(16px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("w-full", className)}
    >
      {/* Card uses CSS vars so it adapts to light/dark */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Corner glows — only visible in dark mode */}
        <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 dark:block hidden"
          style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.12) 0%, transparent 65%)", filter: "blur(20px)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 w-56 h-56 dark:block hidden"
          style={{ background: "radial-gradient(circle at bottom left, rgba(6,182,212,0.08) 0%, transparent 65%)", filter: "blur(20px)" }} />

        {/* Gradient divider */}
        <div className="relative z-10 px-8 pt-8 pb-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px origin-left rounded-full mb-0"
            style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan), transparent)" }}
          />
        </div>

        <div className="relative z-10 px-8 pb-8 space-y-4">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold"
              style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Who Am I?
            </p>

            {/* Bio lines */}
            <div className="space-y-3">
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm leading-[1.8]"
                  style={{
                    color: "var(--color-text-2)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
