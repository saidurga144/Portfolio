import type { CSSProperties } from "react";
import {
  Activity,
  Box,
  Braces,
  Cloud,
  Code2,
  Coffee,
  Database,
  GitBranch,
  Github,
  LockKeyhole,
  Network,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Triangle,
  type LucideIcon,
} from "lucide-react";

type Skill = {
  name: string;
  icon: LucideIcon;
  color: string;
};

const securitySkills: Skill[] = [
  { name: "Network security", icon: Network, color: "#44c5db" },
  { name: "Penetration testing", icon: Search, color: "#a881ff" },
  { name: "Vulnerability assessment", icon: ShieldCheck, color: "#08cf99" },
  { name: "SOC analysis", icon: Activity, color: "#e57f61" },
];

const frontendSkills: Skill[] = [
  { name: "HTML", icon: Code2, color: "#ff684c" },
  { name: "CSS", icon: Code2, color: "#399ce3" },
  { name: "JavaScript", icon: Braces, color: "#f4d62f" },
  { name: "React", icon: Activity, color: "#57c9e8" },
];

const backendSkills: Skill[] = [
  { name: "Java", icon: Coffee, color: "#ed9b42" },
  { name: "Python", icon: Terminal, color: "#55a8d7" },
  { name: "Node.js", icon: Server, color: "#65c56f" },
  { name: "Flask", icon: Code2, color: "#e6e6e6" },
  { name: "REST APIs", icon: Network, color: "#19c4d3" },
  { name: "MySQL", icon: Database, color: "#4c9ec5" },
  { name: "MongoDB", icon: Database, color: "#12c68b" },
  { name: "PostgreSQL", icon: Database, color: "#5b95c8" },
];

const cloudSkills: Skill[] = [
  { name: "Git", icon: GitBranch, color: "#f15b42" },
  { name: "GitHub", icon: Github, color: "#f4eee8" },
  { name: "Docker", icon: Box, color: "#38a9e8" },
  { name: "AWS", icon: Cloud, color: "#f3a925" },
  { name: "Amazon S3", icon: Database, color: "#e7a42a" },
  { name: "Vercel", icon: Triangle, color: "#f4eee8" },
  { name: "CI/CD", icon: GitBranch, color: "#10bfd0" },
];

function SkillChips({ skills }: { skills: Skill[] }) {
  return (
    <ul className="skill-list">
      {skills.map(({ name, icon: Icon, color }) => (
        <li key={name} style={{ "--skill-tint": color } as CSSProperties}>
          <Icon size={14} strokeWidth={2.2} aria-hidden="true" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export function Skills() {
  return (
    <section id="skills" className="portfolio-section skills-section" aria-label="Skills and technologies">
      <div className="portfolio-container">
        <div className="skills-grid">
          <article className="skill-card skill-card-feature" tabIndex={0} aria-labelledby="skills-security-title">
            <div className="skill-card-video skill-card-video--cyber" aria-hidden="true" />
            <div className="skill-card-art skill-card-art-security" aria-hidden="true"><ShieldCheck /></div>
            <div className="skill-card-content">
              <p className="skill-card-kicker">Core expertise</p>
              <h2 id="skills-security-title">Cyber<br /><span>Security</span></h2>
              <div className="skill-card-reveal">
                <SkillChips skills={securitySkills} />
              </div>
              <p className="skill-card-hint"><LockKeyhole size={12} aria-hidden="true" /> Hover to explore</p>
            </div>
          </article>

          <div className="skill-stack">
            <article className="skill-card skill-card-stack" tabIndex={0} aria-labelledby="skills-frontend-title">
              <div className="skill-card-content">
                <p className="skill-card-kicker">Web · UI · frameworks</p>
                <h3 id="skills-frontend-title">Frontend &amp; Frameworks</h3>
                <div className="skill-chip-panel"><SkillChips skills={frontendSkills} /></div>
              </div>
            </article>
            <article className="skill-card skill-card-stack" tabIndex={0} aria-labelledby="skills-cloud-title">
              <div className="skill-card-content">
                <p className="skill-card-kicker">CI/CD · containers · infrastructure</p>
                <h3 id="skills-cloud-title">DevOps &amp; Cloud</h3>
                <div className="skill-chip-panel"><SkillChips skills={cloudSkills} /></div>
              </div>
            </article>
          </div>

          <article className="skill-card skill-card-backend" tabIndex={0} aria-labelledby="skills-backend-title">
            <div className="skill-card-video skill-card-video--backend" aria-hidden="true" />
            <div className="skill-card-art skill-card-art-backend" aria-hidden="true"><Database /></div>
            <div className="skill-card-content">
              <p className="skill-card-kicker">Databases · auth · real-time</p>
              <h3 id="skills-backend-title">Backend &amp; APIs</h3>
              <div className="skill-card-reveal">
                <div className="skill-chip-panel"><SkillChips skills={backendSkills} /></div>
              </div>
              <p className="skill-card-hint"><Server size={12} aria-hidden="true" /> Hover to explore</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
