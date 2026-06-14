'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: unknown[]) { return twMerge(clsx(inputs)); }

interface TeamMemberCardProps {
  position?: 'left' | 'right';
  jobPosition?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  description?: string;
  className?: string;
  onCtaClick?: () => void;
}

export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Cybersecurity Engineer · Full-Stack Developer',
  firstName = 'Sai Kumar',
  lastName = 'Dungala',
  imageUrl = '/saikumar.png',
  description = "I'm a tech-driven learner passionate about building real-world solutions. I enjoy exploring AI, cybersecurity, and innovative software development — blending creativity with technical precision to build things that not only perform, but also inspire.",
  className,
  onCtaClick,
}: TeamMemberCardProps) {
  const isRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative w-full', className)}
    >
      {/* Job position label */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em]"
        style={{ color: 'var(--color-text-3)', fontFamily: 'var(--font-space-grotesk)' }}
      >
        {jobPosition}
      </motion.p>

      {/* ── Overlap container ── */}
      <div className="relative w-full" style={{ minHeight: 'clamp(320px, 44vw, 520px)' }}>

        {/* Portrait image — left ~42% of the container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 overflow-hidden"
          style={{
            width: '80%',
            height: '100%',
          }}
        >
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
          />
        </motion.div>

        {/* Name — absolutely positioned, starting at ~28% from left so it overlaps image right edge */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute"
          style={{
            left: '70%',
            top: '40%',
            transform: 'translateY(-75%)',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
              fontWeight: 300,
              color: 'var(--color-text-1)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              whiteSpace: 'nowrap',
            }}
          >
            {firstName}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
              fontWeight: 600,
              color: 'var(--color-text-1)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            {lastName}
          </p>
        </motion.div>

        {/* Bio — bottom right, below the name */}
        {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute text-sm leading-[1.85]"
          style={{
            left: '50%',
            bottom: '6%',
            width: '46%',
            color: 'var(--color-text-2)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          {description}
        </motion.p>
        )}
      </div>
    </motion.div>
  );
}
