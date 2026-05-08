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
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`;
  const isPositionRight = position === 'right';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-8 sm:my-16 flex flex-col justify-center', className)}
    >
      {/* Job position label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            'mb-4 text-xs font-medium tracking-[0.3em] uppercase',
            isPositionRight && 'text-right'
          )}
          style={{ color: 'var(--color-text-3)' }}
        >
          {jobPosition}
        </p>
      </motion.div>

      {/* Responsive layout: stack on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-end gap-4 sm:gap-0">

        {/* Portrait image — responsive sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative shrink-0 overflow-hidden rounded-xl',
            isPositionRight && 'sm:order-1'
          )}
          style={{
            width: 'clamp(200px, 60vw, 360px)',
            height: 'clamp(260px, 75vw, 500px)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)' }}
          />
          <img
            src={imageUrl}
            alt={fullName}
            className="h-full w-full object-cover duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Name block — overlaps image on sm+, stacks below on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'z-20 flex flex-col',
            'sm:-left-8 sm:relative',
            isPositionRight ? 'sm:left-8 items-end' : 'items-start sm:items-start'
          )}
        >
          <p
            className="font-extralight tracking-tight leading-[1.1]"
            style={{
              color: 'var(--color-text-1)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            }}
          >
            {firstName}
            <br />
            <span className="font-normal">{lastName}</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
