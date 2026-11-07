import { ArrowDownToLine, ArrowUpRight, Code2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const resumes = [
  {
    title: "Cybersecurity résumé",
    detail: "Security, network monitoring, phishing detection, and device-security project work.",
    href: "/sai-cybersecurity.pdf",
    icon: ShieldCheck,
  },
  {
    title: "Full-stack résumé",
    detail: "Web development, cloud computing internship, and application projects.",
    href: "/sairesume-fullstack.pdf",
    icon: Code2,
  },
];

export function Resume() {
  return (
    <section id="resume" className="portfolio-section resume-section">
      <div className="portfolio-container resume-container">
        <SectionHeading number="06" eyebrow="Résumé" title="Choose a version." description="Two focused PDFs are available, depending on the role." />
        <div className="resume-grid">
          {resumes.map(({ title, detail, href, icon: Icon }) => (
            <article className="resume-card" key={href}>
              <span className="resume-icon"><Icon size={19} strokeWidth={1.6} aria-hidden="true" /></span>
              <div className="resume-card-copy"><p>PDF résumé</p><h3>{title}</h3><span>{detail}</span></div>
              <a href={href} download aria-label={`Download ${title}`}><ArrowDownToLine size={17} aria-hidden="true" /><span>Download</span><ArrowUpRight size={14} aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
