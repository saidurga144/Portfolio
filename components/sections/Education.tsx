"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, BookOpen, MapPin, ArrowUpRight, Star, Calendar } from "lucide-react";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealDescription,
  CardCurtain,
} from "@/components/ui/card-curtain-reveal";

const education = [
  {
    degree: "Bachelor of Technology",
    degreeSubtitle: "Computer Science & Engineering (CyberSecurity)",
    institution: "Kalasalingam Academy of Research and Education",
    location: "Krishnankoil, Virudhunagar, Tamil Nadu",
    period: "2023 – 2027",
    score: "CGPA: 8.67",
    icon: <GraduationCap size={18} />,
    color: "#06B6D4",
    curtainColor: "#0F2942",
    titleColor: "#E0F7FA",
    image: "/kare.png",
    fallbackGradient: "linear-gradient(135deg, #0F2942 0%, #0a4a6e 50%, #06B6D4 100%)",
    description: "Specialising in cybersecurity, AI/ML, and full-stack development. Active in research projects and hackathons.",
  },
  {
    degree: "Board of Intermediate",
    degreeSubtitle: "MPC — Mathematics, Physics & Chemistry",
    institution: "Sasi New Gen JR College",
    location: "Velivennu, West Godavari, Andhra Pradesh",
    period: "2021 – 2023",
    score: "96.3%",
    icon: <BookOpen size={18} />,
    color: "#8B5CF6",
    curtainColor: "#1A0A2E",
    titleColor: "#EDE9FE",
    image: "/sasi.png",
    fallbackGradient: "linear-gradient(135deg, #1A0A2E 0%, #3b1a6e 50%, #8B5CF6 100%)",
    description: "Completed intermediate education with distinction, building a strong foundation in mathematics and sciences.",
  },
  {
    degree: "Board of Secondary Education",
    degreeSubtitle: "SSC — Secondary School Certificate",
    institution: "Sasi E.M High School",
    location: "Kanuru, West Godavari, Andhra Pradesh",
    period: "2020 – 2021",
    score: "97.1%",
    icon: <BookOpen size={18} />,
    color: "#10B981",
    curtainColor: "#052E1C",
    titleColor: "#D1FAE5",
    image: "/sasi-1.png",
    fallbackGradient: "linear-gradient(135deg, #052E1C 0%, #065f46 50%, #10B981 100%)",
    description: "Completed secondary education with outstanding academic performance, demonstrating excellence across all subjects.",
  },
];

export function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span
              className="font-bold italic"
              style={{
                fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: "var(--color-text-1)",
              }}
            >
              My Education
            </span>
            <span
              className="font-semibold tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                color: "var(--color-accent-cyan)",
              }}
            >
              Academic Background
            </span>
          </h2>
          <div
            className="h-px w-20"
            style={{ background: "linear-gradient(90deg, var(--color-accent-cyan), transparent)" }}
          />
        </motion.div>

        {/* ── Curtain reveal cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 max-w-6xl">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.2 }}
            >
              <CardCurtainReveal
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  height: "clamp(360px, 55vw, 480px)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                  background: "var(--color-surface)",
                }}
              >
                {/* ── Campus image — always visible as background ── */}
                <div
                  className="absolute inset-0 z-0"
                  style={{ background: e.fallbackGradient }}
                >
                  <img
                    src={e.image}
                    alt={e.institution}
                    className="w-full h-full object-cover"
                    onError={(ev) => {
                      (ev.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Permanent dark gradient — strong enough for both light & dark themes */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.35) 100%)",
                    }}
                  />
                </div>

                {/* ── Body — always visible ── */}
                <CardCurtainRevealBody className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-7">

                  {/* Top: icon + period */}
                  <div className="flex items-center justify-between">
                    {/* Icon with solid visible background */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        background: "rgba(0,0,0,0.65)",
                        border: `2px solid ${e.color}`,
                        color: e.color,
                        backdropFilter: "blur(8px)",
                        boxShadow: `0 0 12px ${e.color}60`,
                      }}
                    >
                      {e.icon}
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{
                        background: "rgba(0,0,0,0.65)",
                        border: `1px solid rgba(255,255,255,0.25)`,
                        color: "#ffffff",
                        fontFamily: "var(--font-dm-sans)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Calendar size={11} />
                      {e.period}
                    </span>
                  </div>

                  {/* Bottom: degree + subtitle always visible */}
                  <div className="overflow-hidden">
                    <h3
                      className="text-xl font-bold leading-snug mb-1"
                      style={{
                        color: "#ffffff",
                        fontFamily: "var(--font-space-grotesk)",
                        position: "relative",
                        zIndex: 20,
                        textShadow: "0 1px 3px rgba(0,0,0,1), 0 4px 16px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.9)",
                      }}
                    >
                      {e.degree}
                    </h3>
                    <p
                      className="text-sm font-bold leading-snug"
                      style={{
                        color: e.color,
                        fontFamily: "var(--font-dm-sans)",
                        position: "relative",
                        zIndex: 20,
                        textShadow: "0 1px 3px rgba(0,0,0,1), 0 4px 12px rgba(0,0,0,1)",
                        filter: "brightness(1.5) drop-shadow(0 0 6px rgba(0,0,0,0.9))",
                      }}
                    >
                      {e.degreeSubtitle}
                    </p>
                  </div>

                  {/* Curtain overlay — slides away on hover */}
                  <CardCurtain
                    style={{ backgroundColor: `${e.curtainColor}d0`, mixBlendMode: "normal" }}
                  />
                </CardCurtainRevealBody>

                {/* ── Footer — revealed on hover ── */}
                <CardCurtainRevealFooter className="mt-auto">
                  <CardCurtainRevealDescription
                    className="px-6 pb-3 pt-2"
                    style={{
                      background: "rgba(0,0,0,0.82)",
                      backdropFilter: "blur(16px)",
                      borderTop: `1px solid ${e.color}30`,
                    }}
                  >
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: e.color, fontFamily: "var(--font-space-grotesk)", filter: "brightness(1.3)" }}
                    >
                      {e.institution}
                    </p>
                    <p
                      className="text-xs flex items-center gap-1.5 mb-2"
                      style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      <MapPin size={11} />
                      {e.location}
                    </p>
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {e.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold"
                        style={{
                          background: `${e.color}25`,
                          border: `1px solid ${e.color}60`,
                          color: "#ffffff",
                          fontFamily: "var(--font-space-grotesk)",
                        }}
                      >
                        <Star size={12} style={{ color: e.color }} />
                        {e.score}
                      </div>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `${e.color}25`,
                          border: `1.5px solid ${e.color}70`,
                          color: e.color,
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </CardCurtainRevealDescription>
                </CardCurtainRevealFooter>
              </CardCurtainReveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
