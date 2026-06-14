"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SkyToggle from "@/components/ui/sky-toggle";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "About",      href: "about" },
  { label: "Skills",     href: "skills" },
  { label: "Projects",   href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact",    href: "contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hideNav, setHideNav] = useState(false);
  const manualScrollRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideNav(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "-60px 0px 0px 0px" }
    );

    const target = document.getElementById("contact");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((l) => l.href)];

    const getActiveIndex = () => {
      if (manualScrollRef.current) return;

      const scrollY = window.scrollY;
      const triggerY = scrollY + window.innerHeight * 0.35;
      let bestIdx = -1;

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollY;
        if (top <= triggerY) bestIdx = i - 1;
      }

      setActiveIndex(bestIdx);
    };

    window.addEventListener("scroll", getActiveIndex, { passive: true });
    getActiveIndex();
    return () => window.removeEventListener("scroll", getActiveIndex);
  }, []);

  const scrollTo = (id: string, index?: number) => {
    setMenuOpen(false);
    if (index !== undefined) setActiveIndex(index);

    manualScrollRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      manualScrollRef.current = false;
    }, 1000);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hideNav ? -80 : 0, opacity: hideNav ? 0 : 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-[100] pointer-events-none"
    >
      {/* Desktop nav */}
      <div className="hidden lg:flex justify-center px-4 pt-5 pointer-events-auto">
        <AnimatePresence mode="wait">
          {scrolled ? (
            /* ── Scrolled: compact signature pill ── */
            <motion.nav
              key="compact"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center rounded-full border px-1.5 py-1.5 backdrop-blur-md w-fit"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              }}
            >
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                aria-label="Home"
                className="flex items-center justify-center px-2 py-0.5 opacity-90 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/signature.png"
                  alt="Sai Kumar signature"
                  width={72}
                  height={28}
                  className="h-6 w-auto object-contain dark:invert"
                  priority
                />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--color-text-1)",
                  color: "var(--color-bg)",
                  fontFamily: "var(--font-inter-tight)",
                }}
              >
                Reach Me
                <ArrowUpRight size={12} strokeWidth={2.2} />
              </button>
            </motion.nav>
          ) : (
            /* ── Default: full nav pill ── */
            <motion.nav
              key="full"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center rounded-full border px-1.5 py-1.5 backdrop-blur-md w-fit"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              }}
            >
              {/* Signature */}
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                aria-label="Home"
                className="flex items-center justify-center px-2 py-0.5 opacity-90 hover:opacity-100 transition-opacity shrink-0"
              >
                <Image
                  src="/signature.png"
                  alt="Sai Kumar signature"
                  width={72}
                  height={28}
                  className="h-6 w-auto object-contain dark:invert"
                  priority
                />
              </button>

              {/* Links */}
              <div className="flex items-center">
                {navLinks.map((link, i) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollTo(link.href, i)}
                    className={`rounded-full px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      activeIndex === i
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-inter-tight)" }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-1 h-4 w-px shrink-0" style={{ backgroundColor: "var(--color-border)" }} />

              {/* Toggle + CTA */}
              <div className="flex items-center gap-1 pl-0.5">
                <div className="scale-[0.78] origin-center">
                  <SkyToggle />
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  style={{
                    backgroundColor: "var(--color-text-1)",
                    color: "var(--color-bg)",
                    fontFamily: "var(--font-inter-tight)",
                  }}
                >
                  Reach Me
                  <ArrowUpRight size={12} strokeWidth={2.2} />
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile / tablet top bar */}
      <div
        className={`lg:hidden pointer-events-auto flex items-center justify-between px-4 h-14 sm:px-5 sm:h-16 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        } : {}}
      >
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          aria-label="Home"
          className="flex h-10 items-center justify-center gap-2"
        >
          {/* Portrait — left, mobile only */}
          <Image
            src="/saikumar.png"
            alt="Sai Kumar"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover object-top grayscale flex-shrink-0"
            style={{ minWidth: 36 }}
          />
          {/* Signature — right */}
          <Image
            src="/signature.png"
            alt="Sai Kumar signature"
            width={90}
            height={36}
            className="h-9 w-auto object-contain dark:invert"
          />
        </button>

        <div className="flex items-center gap-2">
          <SkyToggle />
          <button
            type="button"
            className="rounded-xl p-3 transition-colors active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--color-text-3)", minWidth: 44, minHeight: 44 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden pointer-events-auto border-b backdrop-blur-md"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => scrollTo(link.href, i)}
                  className={`rounded-xl px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-[0.16em] transition-all active:scale-95 ${
                    activeIndex === i
                      ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter-tight)", minHeight: 48 }}
                >
                  {link.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-text-1)",
                  color: "var(--color-bg)",
                  fontFamily: "var(--font-inter-tight)",
                }}
              >
                Reach Me
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
