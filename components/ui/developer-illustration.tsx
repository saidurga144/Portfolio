"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DeveloperIllustration({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`dev-root ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <Image
        src="/developer-robot-reference.png"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 86vw, (max-width: 1024px) 60vw, 62vw"
        className="dev-photo"
      />
      <span className="dev-eye-pupil dev-eye-pupil-left" />
      <span className="dev-eye-pupil dev-eye-pupil-right" />
    </motion.div>
  );
}
