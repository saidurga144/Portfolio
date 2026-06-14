"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation }  from "@/components/Navigation";
import { Hero }        from "@/components/sections/Hero";
import { AboutIntro }  from "@/components/sections/AboutIntro";
import { About }       from "@/components/sections/About";
import { Projects }    from "@/components/sections/Projects";
import { Skills }      from "@/components/sections/Skills";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Connect }     from "@/components/sections/Connect";
import { Resume }      from "@/components/sections/Resume";
import { Contact }     from "@/components/sections/Contact";
import { Footer }      from "@/components/Footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CinematicLanding } from "@/components/ui/cinematic-landing";

export default function HomePage() {
  const [showLanding,      setShowLanding]      = useState(true);
  const [portfolioVisible, setPortfolioVisible] = useState(false);

  const handleEnter = () => {
    setTimeout(() => {
      setShowLanding(false);
      setPortfolioVisible(true);
    }, 800);
  };

  return (
    <>
      {/* Cinematic intro */}
      <AnimatePresence>
        {showLanding && <CinematicLanding onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Portfolio */}
      <AnimatePresence>
        {portfolioVisible && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen cursor-none transition-colors duration-400"
            style={{ backgroundColor: "var(--surface-1)" }}
          >
            <CustomCursor />
            <Navigation />
            <main>
              <Hero />
              <AboutIntro />
              <About />
              <Skills />
              <Projects />
              <ExperienceEducation />
              <Connect />
              <Resume />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
