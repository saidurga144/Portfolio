"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { Mail, Phone, Globe, Download } from "lucide-react";

const resumeContactIcons: Record<string, React.ReactNode> = {
  "📧": <Mail size={14} />,
  "📞": <Phone size={14} />,
  "🌐": <Globe size={14} />,
};

export function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" ref={ref} className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14 text-right">
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span className="font-bold italic"
              style={{ fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-accent-purple)" }}>
              My Resume
            </span>
            <span className="font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                color: "var(--color-text-3)" }}>
              Download &amp; Preview
            </span>
          </h2>
          <div className="h-px w-20 ml-auto"
            style={{ background: "linear-gradient(270deg, var(--color-accent-purple), transparent)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-lg ml-auto rounded-2xl p-8"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-card)" }}>

          {/* Identity */}
          <div className="flex items-center gap-4 mb-6 pb-6"
            style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0"
              style={{ border: "2px solid var(--color-border)" }}>
              <img src="/home .jpeg" alt="Sai Kumar Dungala" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h3 className="text-base font-bold" style={{ color: "var(--color-text-1)", fontFamily: "var(--font-space-grotesk)" }}>
                Sai Kumar Dungala
              </h3>
              <p className="text-xs" style={{ color: "var(--color-accent-purple)", fontFamily: "var(--font-dm-sans)" }}>
                Cybersecurity Engineer · Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-3 mb-8">
            {[
              { icon: "📧", label: "Email",     value: "saikumard912@gmail.com" },
              { icon: "📞", label: "Phone",     value: "7396295445" },
              { icon: "🌐", label: "Portfolio", value: "saikumar-dungala.vercel.app" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <ThemedIcon size={32}>
                  {resumeContactIcons[item.icon]}
                </ThemedIcon>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--color-text-3)", fontFamily: "var(--font-space-grotesk)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
              boxShadow: "0 0 24px rgba(139,92,246,0.25)", fontFamily: "var(--font-dm-sans)" }}>
            <Download size={16} /> Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
