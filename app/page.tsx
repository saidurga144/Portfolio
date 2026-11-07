import { Navigation } from "@/components/Navigation";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <div className="morrow-portfolio">
      <Navigation />
      <main>
        <Hero />
        <AboutIntro />
        <About />
        <ExperienceEducation />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
