"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Magnetic pill ── */
function MagneticPill({ children, accent = "#8B5CF6" }: { children: React.ReactNode; accent?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1,0.3)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <span ref={ref} className="pill-item inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold cursor-default select-none"
      style={{
        background: `${accent}14`, border: `1px solid ${accent}30`, color: accent,
        backdropFilter: "blur(12px)", fontFamily: "var(--font-space-grotesk)", letterSpacing: "0.05em",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${accent}30`; }}
    >{children}</span>
  );
}

interface CinematicAboutProps {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  bio?: string[];
  skills?: { label: string; accent?: string }[];
  imageUrl?: string;
}

export function CinematicAbout({
  firstName = "Sai Kumar",
  lastName = "Dungala",
  jobTitle = "Cybersecurity Engineer · Full-Stack Developer",
  bio = [
    "I'm a tech-driven learner passionate about building real-world solutions.",
    "I enjoy exploring AI, cybersecurity, and innovative software development — blending creativity with technical precision to build things that not only perform, but also inspire.",
    "My interests span full-stack development, cybersecurity, and UI/UX design — creating experiences that are fast, reliable, and visually engaging.",
    "I believe great products are built through continuous learning, experimentation, and attention to detail.",
  ],
  skills = [
    { label: "Cybersecurity",    accent: "#06B6D4" },
    { label: "Full-Stack",   accent: "#8B5CF6" },
    { label: "React & Next.js",  accent: "#06B6D4" },
   
    { label: "Node.js",          accent: "#10B981" },
    
    { label: "Network Security", accent: "#06B6D4" },
    
  ],
  imageUrl = "/sai.png",
}: CinematicAboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);
  const auroraRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      gsap.to(auroraRef.current, { scale: 1.15, opacity: 0.9, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });

      gsap.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
      });

      gsap.fromTo(imageRef.current, { opacity: 0, x: -50, scale: 0.96 }, {
        opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 68%", toggleActions: "play none none none" },
      });

      gsap.fromTo(cardRef.current, { opacity: 0, x: 50, y: 20 }, {
        opacity: 1, x: 0, y: 0, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 68%", toggleActions: "play none none none" },
      });

      const lines = bioRef.current?.querySelectorAll(".bio-line");
      if (lines?.length) {
        gsap.fromTo(lines, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: bioRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      }

      const pills = pillsRef.current?.querySelectorAll(".pill-item");
      if (pills?.length) {
        gsap.fromTo(pills, { opacity: 0, scale: 0.75, y: 12 }, {
          opacity: 1, scale: 1, y: 0, stagger: 0.06, duration: 0.45, ease: "back.out(1.7)",
          scrollTrigger: { trigger: pillsRef.current, start: "top 84%", toggleActions: "play none none none" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const fullName = `${firstName} ${lastName}`;

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: "var(--color-bg)" }}>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.10) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }} />

      {/* Aurora */}
      <div ref={auroraRef} className="absolute pointer-events-none" style={{
        top: "50%", left: "50%", width: "70vw", height: "60vh",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, rgba(6,182,212,0.05) 45%, transparent 70%)",
        filter: "blur(60px)", opacity: 0.7,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
          <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #8B5CF6, transparent)" }} />
          <span className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-space-grotesk)", opacity: 0.8 }}>
            About Me
          </span>
        </div>

        {/* Job title */}
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5"
          style={{ color: "var(--color-text-3)", fontFamily: "var(--font-space-grotesk)" }}>
          {jobTitle}
        </p>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* LEFT — portrait image with name at bottom */}
          <div ref={imageRef} className="shrink-0" style={{ opacity: 0 }}>
            <div className="relative" style={{ width: "clamp(240px, 30vw, 360px)" }}>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                background: "radial-gradient(ellipse at 40% 60%, rgba(139,92,246,0.2) 0%, transparent 65%)",
                filter: "blur(28px)", transform: "scale(1.06)",
              }} />

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden" style={{
                height: "clamp(320px, 42vw, 500px)",
                border: "1px solid rgba(139,92,246,0.18)",
                boxShadow: "0 0 40px rgba(139,92,246,0.10), 0 0 80px rgba(6,182,212,0.05)",
              }}>
                <img src={imageUrl} alt={fullName} className="w-full h-full object-cover object-top" />

                {/* Bottom gradient for name readability */}
                <div className="absolute bottom-0 left-0 right-0 h-3/5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)" }} />

                {/* Name — centered horizontally, lower-center vertically (over chest, not face) */}
                <div className="absolute left-1/2 -translate-x-1/2 text-center select-none pointer-events-none w-full px-4"
                  style={{ top: "52%" }}>
                  <p style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.92)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                  }}>
                    {firstName}
                  </p>
                  <p style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.95)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.0,
                    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                  }}>
                    {lastName}
                  </p>
                </div>

                {/* Badge — bottom left */}
                <div className="absolute bottom-4 left-5 px-3 py-1.5 rounded-xl text-xs font-bold" style={{
                  background: "rgba(139,92,246,0.22)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  backdropFilter: "blur(12px)",
                  color: "#a78bfa",
                  fontFamily: "var(--font-space-grotesk)",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(139,92,246,0.2)",
                }}>
                  B.Tech CSE · 2027
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — dark bio card */}
          <div ref={cardRef} className="flex-1 flex flex-col gap-6" style={{ opacity: 0 }}>

            {/* Dark card matching reference */}
            <div className="rounded-2xl p-6 sm:p-8" style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}>
              {/* "WHO AM I?" label */}
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-space-grotesk)" }}>
                Who Am I?
              </p>

              {/* Gradient divider */}
              <div className="h-px mb-5 rounded-full"
                style={{ background: "linear-gradient(90deg, var(--color-accent-purple), var(--color-accent-cyan), transparent)" }} />

              {/* Bio lines */}
              <div ref={bioRef} className="space-y-3">
                {bio.map((line, i) => (
                  <p key={i} className="bio-line text-sm leading-[1.85]"
                    style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)", opacity: 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Pills below the card */}
            <div ref={pillsRef} className="flex flex-wrap gap-2.5">
              {skills.map((s, i) => (
                <MagneticPill key={i} accent={s.accent}>{s.label}</MagneticPill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
