import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const experience = [
  {
    role: "Cybersecurity Intern",
    company: "Next Cloudwave Solutions Pvt. Ltd.",
    period: "November 2025 – February 2026",
    location: "Remote",
    metrics: [
      { value: "10+", label: "web applications tested" },
      { value: "10+", label: "critical vulnerabilities identified" },
      { value: "3+", label: "bug bounty programs" },
    ],
    responsibilities: [
      "Conducted web application vulnerability assessments and penetration tests with Burp Suite, OWASP ZAP, and Nmap, documenting risk and remediation for 10+ applications.",
      "Tested authentication, authorization, APIs, and session management across 5+ applications; findings contributed to a 30% reduction in attack surface.",
      "Hunted across 3+ bug bounty programs and documented 10+ security findings with risk ratings and remediation recommendations.",
      "Used Kali Linux, Parrot OS, Wireshark, Gobuster, Nikto, and Metasploit in practical assessments, contributing to a 40% increase in threat detection coverage.",
    ],
    tools: [
      "Burp Suite", "OWASP ZAP", "Nmap", "Wireshark", "Kali Linux", "Parrot OS",
      "Gobuster", "Nikto", "Metasploit", "Penetration Testing", "Vulnerability Assessment",
      "OWASP Top 10", "API Security",
    ],
  },
  {
    role: "Cloud Computing Intern",
    company: "Micro Information Technology Service",
    period: "May 2025 – June 2025",
    location: "Ambala & Bhiwani, Haryana, India",
    responsibilities: [
      "Improved deployment speed by 40% through AWS application delivery workflows.",
      "Deployed Docker virtualization and Amazon S3 storage solutions for cloud infrastructure.",
      "Designed auto-scaling, load-balanced cloud systems and supported monitoring.",
      "Built CI/CD pipelines to reduce release cycles for cloud projects.",
    ],
    tools: ["AWS", "Docker", "Amazon S3", "CI/CD", "Auto-scaling", "Load balancing"],
  },
];

const education = [
  {
    degree: "Bachelor of Technology",
    specialization: "Computer Science & Engineering · Cybersecurity",
    institution: "Kalasalingam Academy of Research and Education",
    location: "Krishnankoil, Virudhunagar, Tamil Nadu",
    period: "2023 – 2027",
    result: "CGPA 8.67",
    description: "Specialising in cybersecurity, AI/ML, and full-stack development; active in research projects and hackathons.",
  },
  {
    degree: "Board of Intermediate",
    specialization: "MPC · Mathematics, Physics & Chemistry",
    institution: "Sasi New Gen JR College",
    location: "Velivennu, West Godavari, Andhra Pradesh",
    period: "2021 – 2023",
    result: "96.3%",
    description: "Completed intermediate education with distinction and a strong foundation in mathematics and sciences.",
  },
  {
    degree: "Board of Secondary Education",
    specialization: "SSC · Secondary School Certificate",
    institution: "Sasi E.M High School",
    location: "Kanuru, West Godavari, Andhra Pradesh",
    period: "2020 – 2021",
    result: "97.1%",
    description: "Completed secondary education with outstanding academic performance, demonstrating excellence across all subjects.",
  },
];

export function ExperienceEducation() {
  return (
    <section id="experience" className="portfolio-section journey-section journey-combined-section">
      <div className="portfolio-container">
        <SectionHeading
          number="03"
          eyebrow="Professional & academic background"
          title="Experience & Education"
          description="The work I’ve done and the academic foundations behind it, in one place."
        />

        <div className="journey-groups">
          <div className="journey-group">
            <header className="journey-group-heading">
              <span className="journey-group-number">01</span>
              <h3>Work experience</h3>
              <span className="journey-group-count">2 roles</span>
            </header>

            <div className="journey-entries">
              {experience.map((entry, index) => (
                <article className="journey-entry-card journey-work-card" key={entry.company}>
                  <div className="journey-entry-aside">
                    <span className="journey-entry-index">0{index + 1}</span>
                    <span className="journey-entry-period">{entry.period}</span>
                    <span className="journey-entry-location"><MapPin size={13} aria-hidden="true" />{entry.location}</span>
                  </div>

                  <div className="journey-entry-content">
                    <div className="journey-entry-title-row">
                      <div>
                        <p className="journey-entry-kicker"><BriefcaseBusiness size={13} aria-hidden="true" /> Professional experience</p>
                        <h4>{entry.role}</h4>
                        <p className="journey-entry-organization">{entry.company}</p>
                      </div>
                      {entry.location === "Remote" && <span className="journey-mode-badge">Remote</span>}
                    </div>

                    {entry.metrics && (
                      <div className="journey-metric-row" aria-label="Internship highlights">
                        {entry.metrics.map((metric) => (
                          <div className="journey-metric" key={metric.label}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <ul className="journey-responsibility-list">
                      {entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>

                    <div className="journey-tool-list" aria-label="Technologies and skills">
                      {entry.tools.map((tool) => <span key={tool}>{tool}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="journey-group journey-education-group" id="education">
            <header className="journey-group-heading">
              <span className="journey-group-number">02</span>
              <h3>Education</h3>
              <span className="journey-group-count">Academic history</span>
            </header>

            <div className="journey-entries">
              {education.map((entry, index) => (
                <article className="journey-entry-card journey-education-card" key={entry.degree}>
                  <div className="journey-entry-aside">
                    <span className="journey-entry-index">0{index + 1}</span>
                    <span className="journey-entry-period">{entry.period}</span>
                  </div>

                  <div className="journey-entry-content">
                    <div className="journey-entry-title-row">
                      <div>
                        <p className="journey-entry-kicker"><GraduationCap size={14} aria-hidden="true" /> Academic background</p>
                        <h4>{entry.degree}</h4>
                        <p className="journey-entry-organization">{entry.institution}</p>
                      </div>
                      <span className="journey-result-badge">{entry.result}</span>
                    </div>
                    <p className="journey-entry-specialization">{entry.specialization}</p>
                    <p className="journey-entry-location"><MapPin size={13} aria-hidden="true" />{entry.location}</p>
                    <p className="journey-entry-description">{entry.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <a className="journey-resume-link" href="/sai-cybersecurity.pdf" target="_blank" rel="noopener noreferrer">
          View cybersecurity résumé <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
