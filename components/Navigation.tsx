"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LimelightNav, NavItem } from "@/components/ui/limelight-nav";
import SkyToggle from "@/components/ui/sky-toggle";
import { ThemedIcon } from "@/components/ui/themed-icon";
import {
  Home, User, FolderKanban, Cpu, Briefcase, Mail, FileText, Menu, X, GraduationCap,
} from "lucide-react";

const navLinks = [
  { label: "Home",       href: "hero",       icon: <Home /> },
  { label: "About",      href: "about",      icon: <User /> },
  { label: "Projects",   href: "projects",   icon: <FolderKanban /> },
  { label: "Skills",     href: "skills",     icon: <Cpu /> },
  { label: "Experience", href: "experience", icon: <Briefcase /> },
  { label: "Education",  href: "education",  icon: <GraduationCap /> },
  { label: "Contact",    href: "contact",    icon: <Mail /> },
];

export function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track whether user manually clicked — suppress observer briefly
  const manualScrollRef = useRef(false);
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll-based active section tracking ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href);

    const getActiveIndex = () => {
      if (manualScrollRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Use 40% from top of viewport as the "trigger line"
      const triggerY = scrollY + viewportHeight * 0.4;

      let bestIdx = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= triggerY) {
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };

    window.addEventListener("scroll", getActiveIndex, { passive: true });
    // Run once on mount to set correct initial state
    getActiveIndex();

    return () => window.removeEventListener("scroll", getActiveIndex);
  }, []);

  /* ── Manual scroll-to ── */
  const scrollTo = (id: string, index: number) => {
    setMenuOpen(false);
    setActiveIndex(index);

    // Suppress observer for 1 s so the limelight doesn't flicker
    manualScrollRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      manualScrollRef.current = false;
    }, 1000);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* Build NavItem array */
  const navItems: NavItem[] = navLinks.map((link, i) => ({
    id: link.href,
    icon: link.icon,
    label: link.label,
    onClick: () => scrollTo(link.href, i),
  }));

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
    >
      {/* ── Desktop nav ── */}
      <div className="hidden md:flex justify-center pt-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <LimelightNav
            items={navItems}
            activeIndex={activeIndex}
            onTabChange={(i) => scrollTo(navLinks[i].href, i)}
            className="bg-black/75 border-white/10 backdrop-blur-md rounded-2xl"
          />

          {/* Sky theme toggle — left of Resume */}
          <div className="flex items-center">
            <SkyToggle />
          </div>

          {/* Resume pill */}
          <ThemedIcon href="/resume.pdf" label="Resume" size={42}>
            <FileText size={16} />
          </ThemedIcon>
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className={`md:hidden pointer-events-auto flex items-center justify-between px-5 h-16
                    transition-all duration-300 ${
                      scrolled
                        ? "bg-black/85 backdrop-blur-md border-b border-white/5"
                        : "bg-transparent"
                    }`}
      >
        {/* Sky toggle on mobile */}
        <SkyToggle />
        <button
          className="p-3 text-slate-400 hover:text-white transition-colors rounded-xl active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto bg-black/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href, i)}
                  className={`flex items-center gap-3 text-left px-4 py-3.5 text-sm rounded-xl transition-all active:scale-95 ${
                    activeIndex === i
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-dm-sans)", minHeight: 48 }}
                >
                  <ThemedIcon size={32} onClick={() => scrollTo(link.href, i)}>
                    {link.icon}
                  </ThemedIcon>
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-3 mt-1">
                <ThemedIcon href="/resume.pdf" label="Resume" size={30}>
                  <FileText size={14} />
                </ThemedIcon>
                <span className="text-sm font-semibold" style={{ color: "var(--color-accent-cyan)", fontFamily: "var(--font-dm-sans)" }}>
                  Resume
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
