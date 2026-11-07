"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let active = "hero";
      for (const id of ["about", "experience", "education", "skills", "projects", "resume", "contact"]) {
        const node = document.getElementById(id);
        const top = node ? node.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
        if (top <= marker) active = id;
      }
      setActiveSection(active);
      setScrolled(active !== "hero");
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const links = menuRef.current?.querySelectorAll<HTMLElement>("a[href]");
      if (!links?.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`portfolio-header fixed inset-x-0 top-0 z-[100] ${scrolled ? "is-compact" : ""}`}
    >
      <div className="portfolio-header-inner">
        <a href="#hero" onClick={closeMenu} className="portfolio-brand" aria-label="Sai Kumar, home">
          <span className="portfolio-brand-name">sai kumar</span>
        </a>

        <nav className="portfolio-desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={`#${link.href}`} className={activeSection === link.href ? "is-active" : ""}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="portfolio-header-actions">
          <a className="portfolio-talk" href="#contact">
            Reach Me <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </a>
          <button
            ref={menuTriggerRef}
            type="button"
            className="portfolio-menu-button inline-flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-controls="portfolio-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={menuRef}
            id="portfolio-mobile-menu"
            className="portfolio-mobile-menu absolute right-4 top-[calc(100%+8px)] rounded-2xl border p-2 shadow-2xl backdrop-blur-xl"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={closeMenu}
                className={activeSection === link.href ? "is-active" : ""}
                aria-current={activeSection === link.href ? "location" : undefined}
              >
                <span className="portfolio-menu-index">0{index + 1}</span>
                <span>{link.label}</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
            <a href="#contact" className="portfolio-mobile-cta" onClick={closeMenu}>
              Reach Me <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
