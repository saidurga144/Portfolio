"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { Mail, Linkedin } from "lucide-react";

export function CTA() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 flex flex-col items-center gap-8"
      >
        <h2 className="bg-gradient-to-br from-orange-300 via-yellow-400 to-orange-300 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl">
          Ready to Build <br /> Something Amazing?
        </h2>
        
        <p className="text-slate-300 text-center text-lg md:text-xl max-w-2xl">
          Let&apos;s collaborate on your next cybersecurity project or discuss how I can help secure your applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <a
            href="mailto:saikumard912@gmail.com"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
          >
            <Mail size={22} />
            <span>Get In Touch</span>
          </a>

          <a
            href="https://linkedin.com/in/sai-kumar-dungala-393538289"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-600 hover:border-orange-400 text-slate-200 hover:text-orange-400 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <Linkedin size={22} />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </motion.div>
    </LampContainer>
  );
}
