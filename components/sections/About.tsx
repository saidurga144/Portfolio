'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TeamMemberCard from '@/components/ui/team-member-card';
import { AboutInfoCard } from '@/components/ui/about-info-card';

export function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const cardInView  = useInView(cardRef as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* ── Atmospheric glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: bgY }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
        >
          <div className="w-full h-full rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 65%)', filter: 'blur(90px)' }} />
        </motion.div>
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      </div>

      {/* ── Section wrapper ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24">

        {/* ── Section eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="h-px w-12"
            style={{ background: 'linear-gradient(90deg, #8B5CF6, transparent)' }} />
          <span className="text-xs tracking-[0.4em] uppercase"
            style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-space-grotesk)', opacity: 0.8 }}>
            About Me
          </span>
        </motion.div>

        {/* ══════════════════════════════════════════
            MAIN LAYOUT — image left, card right
        ══════════════════════════════════════════ */}
        <div className="flex flex-col xl:flex-row items-start gap-0 xl:gap-8">

          {/* ── LEFT — TeamMemberCard (image + name + bio) ── */}
          <div className="w-full xl:w-[55%] shrink-0">
            <TeamMemberCard
              position="left"
              jobPosition="Cybersecurity Engineer · Full-Stack Developer"
              firstName="Sai Kumar"
              lastName="Dungala"
              imageUrl="/sai.png"
              description="I'm a tech-driven learner passionate about building real-world solutions. I enjoy exploring AI, cybersecurity, and innovative software development — blending creativity with technical precision to build things that not only perform, but also inspire."
              onCtaClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-0"
            />
          </div>

          {/* ── RIGHT — Info card ── */}
          <div
            ref={cardRef}
            className="w-full xl:w-[45%] xl:sticky xl:top-24 self-start"
          >
            <AboutInfoCard inView={cardInView} />
          </div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mt-16 mb-16 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)' }}
        />

        {/* ── Extended bio blocks ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-4">
          {[
            
          ].map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1.0, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-6 border-l-2"
              style={{ borderColor: block.color }}
            >
              <p className="text-base font-bold mb-3 leading-snug"
                style={{ color: block.color, fontFamily: 'var(--font-space-grotesk)' }}>
                {block.title}
              </p>
              <p className="text-sm leading-[1.85]"
                style={{ color: 'rgba(148,163,184,0.85)', fontFamily: 'var(--font-dm-sans)' }}>
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
