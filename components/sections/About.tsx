'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TeamMemberCard from '@/components/ui/team-member-card';
import { AboutInfoCard } from '@/components/ui/about-info-card';

export function About() {
  const cardRef    = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef as React.RefObject<Element>, { once: true, margin: '-5% 0px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.14) 0%, transparent 65%)', filter: 'blur(90px)' }} />
        <div className="absolute top-[40%] right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 pt-20 pb-24">

        {/* Eyebrow */}
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

        {/* Main layout — portrait left, info card right (side by side) */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

          {/* LEFT — portrait with overlapping name */}
          <div className="shrink-0 w-full lg:w-auto">
            <TeamMemberCard
              position="left"
              jobPosition="Cybersecurity Engineer · Full-Stack Developer"
              firstName="Sai Kumar"
              lastName="Dungala"
              imageUrl="/sai.jpeg"
              description=""
              onCtaClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </div>

          {/* RIGHT — info card, vertically centered */}
          <div ref={cardRef} className="w-full lg:flex-1 self-center lg:ml-16">
            <AboutInfoCard inView={cardInView} />
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-px mt-16 mb-16 origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)' }}
        />
      </div>
    </section>
  );
}
