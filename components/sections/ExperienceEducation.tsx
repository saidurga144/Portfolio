'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export function ExperienceEducation() {
  return (
    <section id="experience">
      <FlowArt aria-label="Experience and Education">

        {/* ── 01 Experience ── */}
        <FlowSection
          aria-label="Work Experience"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-1)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-inter-tight)' }}
          >
            01 — Work Experience
          </p>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <div>
            <h2
              className="font-black uppercase tracking-tight leading-[0.88]"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                color: 'var(--color-text-1)',
                letterSpacing: '-0.03em',
              }}
            >
              Cloud<br />Computing<br />Intern
            </h2>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Organisation
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                Micro Information Technology Service<br />
                Ambala &amp; Bhiwani, Haryana, India
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Period
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                May 2025 — June 2025
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-purple)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Stack
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                AWS · Docker · S3 · CI/CD · Auto-scaling
              </p>
            </div>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <p
            className="mt-auto max-w-[55ch] font-normal leading-relaxed"
            style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(1rem,2.2vw,1.6rem)' }}
          >
            Achieved 40% faster deployment times. Built auto-scaling, load-balanced cloud
            systems and CI/CD pipelines that reduced release cycles significantly.
          </p>
        </FlowSection>

        {/* ── 02 Project ── */}
        <FlowSection
          aria-label="Featured Project"
          style={{ backgroundColor: '#0d1117', color: '#ffffff' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: '#8B5CF6', fontFamily: 'var(--font-inter-tight)' }}
          >
            02 — Featured Project
          </p>

          <hr className="border-none border-t h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <div>
            <h2
              className="font-black uppercase tracking-tight leading-[0.88]"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                color: '#ffffff',
                letterSpacing: '-0.03em',
              }}
            >
              Agri<br />Predict
            </h2>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#8B5CF6', fontFamily: 'var(--font-space-grotesk)' }}>
                What it does
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7 }}>
                ML-powered crop recommendation using soil &amp; weather data.
                Random Forest classifier with 96%+ accuracy across 12 crop types.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#8B5CF6', fontFamily: 'var(--font-space-grotesk)' }}>
                Stack
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7 }}>
                Python · Flask · React · Vercel
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#8B5CF6', fontFamily: 'var(--font-space-grotesk)' }}>
                Period
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7 }}>
                Jan 2026 — Feb 2026
              </p>
            </div>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <p
            className="mt-auto max-w-[55ch] font-normal leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(1rem,2.2vw,1.6rem)' }}
          >
            Empowering farmers with data-driven crop selection. Reduced guesswork for
            smallholder farmers — fully deployed and mobile-friendly.
          </p>
        </FlowSection>

        {/* ── 03 Education ── */}
        <FlowSection
          aria-label="Education"
          style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-1)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-inter-tight)' }}
          >
            03 — Education
          </p>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <div>
            <h2
              className="font-black uppercase tracking-tight leading-[0.88]"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                color: 'var(--color-text-1)',
                letterSpacing: '-0.03em',
              }}
            >
              B.Tech<br />CSE &amp;<br />CyberSecurity
            </h2>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Institution
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                Kalasalingam Academy of Research and Education<br />
                Krishnankoil, Tamil Nadu
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Period
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                2023 — 2027
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p
                className="mb-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-space-grotesk)' }}
              >
                Focus
              </p>
              <p style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(0.85rem,1.3vw,1.05rem)', lineHeight: 1.7, opacity: 0.85 }}>
                Cybersecurity · Full-Stack Development
              </p>
            </div>
          </div>

          <hr className="border-none border-t h-px" style={{ background: 'var(--color-border)', opacity: 0.6 }} />

          <p
            className="mt-auto max-w-[55ch] font-normal leading-relaxed"
            style={{ color: 'var(--color-text-2)', fontFamily: 'var(--font-dm-sans)', fontSize: 'clamp(1rem,2.2vw,1.6rem)' }}
          >
            Pursuing Computer Science with a focus at Cybersecurity.
            Active in research projects, hackathons, and live deployment of full-stack applications.
          </p>
        </FlowSection>

      </FlowArt>
    </section>
  );
}
