import Image from "next/image";
import { ArrowUpRight, Github, GraduationCap, Linkedin, Mail, Phone, ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="portfolio-section about-section">
      <div className="portfolio-container">
        <div className="about-layout">
          <figure className="about-illustration">
            <Image
              src="/about-illustration.png"
              alt="A 3D illustration of a developer working on a laptop"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <figcaption><span>01 / 04</span><strong>Learning through building</strong></figcaption>
          </figure>

          <div className="about-profile">
            <header className="about-profile-heading">
              <p><span>02</span> About me</p>
              <h2>Personal Info</h2>
            </header>

            <div className="about-copy">
              <p>I&apos;m a Computer Science Engineering student focused on cybersecurity and secure software development. My projects span web applications, phishing detection, career guidance, and agricultural decision support.</p>
              <p>I like understanding a product end to end: the problem it addresses, the interface people use, the services behind it, and the security assumptions around it. I value clear explanations, maintainable code, and testing ideas in small, practical steps.</p>
            </div>

            <div className="about-info-grid" role="group" aria-label="Contact and study information">
              <a className="about-info-card" href="mailto:saikumard912@gmail.com">
                <span className="about-info-label"><Mail size={15} aria-hidden="true" /> Email</span>
                <strong>saikumard912@gmail.com</strong>
                <ArrowUpRight className="about-info-arrow" size={15} aria-hidden="true" />
              </a>

              <a className="about-info-card" href="tel:+917396295445">
                <span className="about-info-label"><Phone size={15} aria-hidden="true" /> Phone</span>
                <strong>+91 73962 95445</strong>
                <ArrowUpRight className="about-info-arrow" size={15} aria-hidden="true" />
              </a>

              <div className="about-info-card">
                <span className="about-info-label"><GraduationCap size={16} aria-hidden="true" /> Current study</span>
                <strong>B.Tech · Computer Science</strong>
                <small>Cybersecurity · 2023–2027</small>
              </div>

              <div className="about-info-card about-social-card">
                <span className="about-info-label"><ShieldCheck size={15} aria-hidden="true" /> Follow</span>
                <div className="about-social-links">
                  <a href="https://linkedin.com/in/sai-kumar-dungala-393538289" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin size={18} aria-hidden="true" />
                  </a>
                  <a href="https://github.com/saidurga144" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
