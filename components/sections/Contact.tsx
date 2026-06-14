"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ThemedIcon } from "@/components/ui/themed-icon";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const LinkedInIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const GitHubIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>);

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "Project Discussion", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--color-bg)",
    border: "1px solid var(--color-border)",
    borderRadius: 10,
    color: "var(--color-text-1)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 13,
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} className="py-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-4">
          <h2 className="leading-none flex flex-col gap-1 mb-2">
            <span className="font-bold italic"
              style={{ fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--color-text-1)" }}>
              Get In Touch
            </span>
            <span className="font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(0.7rem, 1.5vw, 1.1rem)",
                color: "var(--color-accent-purple)" }}>
              Let&apos;s Build Something Great
            </span>
          </h2>
          <div className="h-px w-20" style={{ background: "linear-gradient(90deg, var(--color-accent-purple), transparent)" }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-sm mb-14 max-w-lg"
          style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>
          Whether it&apos;s a project, collaboration or opportunity — let&apos;s build something great together.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: info + socials */}
          <div className="space-y-4">
            {[
              { icon: <MapPin size={16} />, label: "Location", value: "India",                  color: "var(--color-accent-cyan)" },
              { icon: <Phone size={16} />,  label: "Phone",    value: "7396295445",             color: "var(--color-accent-purple)" },
              { icon: <Mail size={16} />,   label: "Email",    value: "saikumard912@gmail.com", color: "var(--color-accent-cyan)" },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)" }}>
                <ThemedIcon size={32} accentColor={item.color}>
                  {item.icon}
                </ThemedIcon>
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5"
                    style={{ color: item.color, fontFamily: "var(--font-space-grotesk)" }}>
                    {item.label}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-2)", fontFamily: "var(--font-dm-sans)" }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }} className="flex gap-3 pt-2">
              {[
                { icon: <LinkedInIcon />, href: "https://linkedin.com/in/sai-kumar-dungala-393538289", label: "LinkedIn" },
                { icon: <GitHubIcon />,   href: "https://github.com/saidurga144",                      label: "GitHub" },
                { icon: <Globe size={16} />, href: "https://saikumar-dungala.vercel.app",              label: "Portfolio" },
              ].map((s) => (
                <ThemedIcon key={s.label} href={s.href} label={s.label} size={38}>
                  {s.icon}
                </ThemedIcon>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl p-4 sm:p-6 space-y-4"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)" }}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>Name</label>
                <input type="text" required placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>Email</label>
                <input type="email" required placeholder="your@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>Subject</label>
              <div className="relative">
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    WebkitAppearance: "none",
                    paddingRight: "36px",
                    cursor: "pointer",
                  }}
                >
                  <option value="Project Discussion">Project Discussion</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Internship">Internship</option>
                  <option value="Other">Other</option>
                </select>
                {/* Custom dropdown arrow */}
                <div
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-accent-cyan)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--color-text-3)", fontFamily: "var(--font-dm-sans)" }}>Message</label>
              <textarea required rows={4} placeholder="Tell me about your project..." value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "none" }} />
            </div>

            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
              style={{ background: sent ? "rgba(6,182,212,0.3)" : "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                boxShadow: "0 0 24px rgba(6,182,212,0.2)", fontFamily: "var(--font-dm-sans)" }}>
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
