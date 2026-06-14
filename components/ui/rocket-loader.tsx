"use client";

import { motion } from "framer-motion";

interface RocketLoaderProps {
  visible: boolean;
}

export function RocketLoader({ visible }: RocketLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 1.4,
        y: visible ? 0 : -120,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    >
      {/* Clouds layer */}
      <div className="rocket-clouds">
        <div className="rocket-cloud rocket-cloud1" />
        <div className="rocket-cloud rocket-cloud2" />
        <div className="rocket-cloud rocket-cloud3" />
        <div className="rocket-cloud rocket-cloud4" />
        <div className="rocket-cloud rocket-cloud5" />
      </div>

      {/* Rocket */}
      <div className="rocket-loader-inner">
        {/* Exhaust trails */}
        <span className="rocket-exhaust">
          <span />
          <span />
          <span />
          <span />
        </span>
        {/* Body */}
        <div className="rocket-base">
          <span className="rocket-thruster" />
          <div className="rocket-face" />
        </div>
      </div>

      {/* Speed lines */}
      <div className="rocket-longfazers">
        <span />
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  );
}
