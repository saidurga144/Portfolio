"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { createPortal } from "react-dom";
import { SectionHeading } from "@/components/ui/section-heading";
import PortalCarousel from "@/components/ui/portal-carousel";
import { PROJECT_LIVE_SITES } from "@/lib/project-live-sites";



type ProjectDetails = {
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  security?: string[];
  outcomes?: string[];
};

type ProjectId = "pdsw" | "agripredict" | "linkarmor" | "insprizy" | "clarionet";

type Project = {
  id: ProjectId;
  number: string;
  name: string;
  headline: string;
  category: string;
  period: string;
  demoUrl: string;
  repository: string;
  purpose: string;
  technologies: string[];
  features: string[];
  details: ProjectDetails;
};

const PROJECTS: Project[] = [
  {
    id: "pdsw",
    number: "01",
    name: "PDSW",
    headline: "AI-Driven Privacy-Preserving Blockchain Framework",
    category: "Full-Stack · Cybersecurity · AI · Blockchain",
    period: "Jan — Mar 2026",
    demoUrl: PROJECT_LIVE_SITES.pdsw,
    repository: "https://github.com/saidurga144/pdsw",
    purpose:
      "A secure, AI-driven Public Distribution System platform that combines blockchain-based record integrity, anomaly detection, role-based access control, and privacy-preserving data management for transparent ration distribution.",
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "MongoDB Atlas",
      "Ethereum Sepolia",
      "Solidity",
      "IPFS / Pinata",
      "AI / Machine Learning",
      "Cryptographic Hashing",
    ],
    features: [
      "Role-Based Access Control (RBAC) — dedicated dashboards for Administrators, PDS Officers, SOC Analysts, and Beneficiaries.",
      "Blockchain Verification — Ethereum Sepolia smart-contract integration for tamper-evident transaction records.",
      "Decentralised Document Storage — IPFS through Pinata for secure supporting document management.",
      "AI-Based Anomaly Detection — identifies suspicious patterns in ration distribution and beneficiary records.",
      "Cryptographic Data Integrity — hash-based verification flags any unauthorised record modification.",
    ],
    details: {
      overview:
        "PDSW is a secure, AI-driven Public Distribution System platform built to modernise ration distribution. It layers blockchain verification, anomaly detection, and privacy-preserving mechanisms on top of a conventional delivery system to bring transparency, data integrity, and accountability to how rations are allocated and tracked.",
      problem:
        "Traditional public distribution systems suffer from limited transparency, manual record-keeping, and weak audit trails. Records can be altered without detection, beneficiary data is difficult to verify, and suspicious distribution patterns often go unnoticed until losses become systemic.",
      solution:
        "PDSW anchors key records on Ethereum Sepolia for tamper-evident traceability, stores supporting documents on IPFS through Pinata, enforces role-based access control across dedicated dashboards, and applies AI-based anomaly detection to surface unusual patterns.",
      architecture:
        "React + TypeScript frontend serves dedicated dashboards; Python backend handles business logic and ML inference; MongoDB Atlas manages application data; Ethereum Sepolia hosts smart-contract verification; IPFS via Pinata provides decentralised document storage.",
      security: [
        "Role-Based Access Control limits access to features per actor.",
        "Cryptographic hash-based data-integrity checks flag any unauthorised modification.",
        "Ethereum Sepolia blockchain records provide immutable, auditable transactions.",
        "Decentralised IPFS document storage via Pinata reduces single points of tampering.",
        "AI anomaly detection surfaces suspicious distribution and beneficiary behaviour early.",
      ],
      outcomes: [
        "Reported SHA-256 checks passed for 54 of 55 test records (98.18%).",
        "Reported Isolation Forest evaluation detected 52 of 57 labelled anomalies (91.2% recall).",
      ],
    },
  },
  {
    id: "agripredict",
    number: "02",
    name: "AgriPredict",
    headline: "AI-Based Crop Yield Prediction Platform",
    category: "Agriculture · Machine Learning",
    period: "Jan — Feb 2026",
    demoUrl: PROJECT_LIVE_SITES.agripredict,
    repository: "https://github.com/saidurga144/AgriPredict",
    purpose:
      "An AI-powered agricultural platform that helps farmers and planners estimate crop yields and receive recommendations based on soil composition, weather patterns, seasonal trends, and regional data.",
    technologies: [
      "React.js",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "MongoDB",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Groq API",
    ],
    features: [
      "Collects soil and weather inputs such as NPK, pH, rainfall, and temperature.",
      "Returns crop recommendations from a trained prediction model.",
      "Presents results through a React dashboard with visual summaries.",
    ],
    details: {
      overview:
        "AgriPredict combines agricultural inputs with a machine-learning model to help users compare crop options and plan around local soil and weather conditions.",
      problem:
        "Choosing a crop from soil and seasonal conditions can be difficult when the relevant information is spread across measurements and local knowledge.",
      solution:
        "The application collects soil and weather values, sends them to a prediction service, and presents the resulting crop recommendations in a web interface.",
      architecture:
        "A React and Vite frontend presents the workflow and charts. A Python FastAPI service exposes prediction endpoints, using Scikit-learn with Pandas and NumPy; MongoDB is included for application data.",
    },
  },
  {
    id: "linkarmor",
    number: "03",
    name: "Link-Armor",
    headline: "AI-Based Phishing Detection Platform",
    category: "Cybersecurity · Phishing Detection",
    period: "Oct — Dec 2025",
    demoUrl: PROJECT_LIVE_SITES.linkarmor,
    repository: "https://github.com/saidurga144/LinkArmor",
    purpose:
      "A cybersecurity platform that analyses suspicious URLs, identifies potential phishing threats, and delivers consolidated security insights through an interactive risk dashboard backed by multiple threat-intelligence engines.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Genkit",
      "Firebase",
      "Google GenAI",
      "VirusTotal API",
    ],
    features: [
      "Accepts a URL for phishing-risk analysis.",
      "Combines AI-assisted analysis with a clear result view.",
      "Provides a focused workflow for reviewing suspicious links.",
    ],
    details: {
      overview:
        "Link-Armor is a web application for reviewing suspicious URLs and surfacing phishing risk in a readable result view.",
      problem:
        "A URL can look familiar while leading to a phishing page, and manual inspection alone gives users little context for deciding whether to trust it.",
      solution:
        "The application sends URL analysis through its AI-assisted workflow and presents the assessment in a focused interface for review.",
      architecture:
        "The project uses a Next.js and React application with server-side functionality, Genkit, Google GenAI, and Firebase services. The repository also includes Firestore security rules; no specific database usage is asserted here.",
    },
  },
  {
    id: "insprizy",
    number: "04",
    name: "Insprizy",
    headline: "Insprizy — Interactive Career Guidance App",
    category: "Career Planning · Assessment",
    period: "Nov 2025 — Jan 2026",
    demoUrl: PROJECT_LIVE_SITES.insprizy,
    repository: "https://github.com/saidurga144/CareerGudiance",
    purpose:
      "Connects a person's interests, strengths, and aptitude responses with relevant career directions. An assessment flow with weighted matching presents career paths and practical next steps.",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Genkit",
      "Google GenAI",
    ],
    features: [
      "Guides users through an interest and aptitude assessment.",
      "Uses weighted matching to connect responses with career directions.",
      "Presents practical next steps alongside suggested paths.",
    ],
    details: {
      overview:
        "Insprizy is an interactive career-guidance app that helps users explore career directions through an assessment and tailored suggestions.",
      problem:
        "Students can find it hard to connect their interests and strengths with realistic career paths and useful next steps.",
      solution:
        "An assessment gathers user responses and applies weighted matching to present relevant career directions and practical guidance.",
      architecture:
        "The application is built with Next.js, React, and TypeScript. Its server-side AI flow uses Genkit with Google AI; Firebase is included in the project dependencies.",
    },
  },
  {
    id: "clarionet",
    number: "05",
    name: "Clarionet",
    headline: "Mobile Device Forensics Platform",
    category: "Cybersecurity · Digital Forensics · Android",
    period: "Sep — Nov 2025",
    demoUrl: PROJECT_LIVE_SITES.clarionet,
    repository: "https://github.com/saidurga144/Clarionet",
    purpose:
      "A digital forensics platform supporting mobile-device analysis, security investigation, file integrity verification, and forensic data extraction through ADB connectivity and PIN-resilience testing workflows for authorised lab use.",
    technologies: [
      "React.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "Android Debug Bridge (ADB)",
      "VirusTotal API",
    ],
    features: [
      "Connects to Android devices through ADB over USB or Wi-Fi.",
      "Supports file and APK security analysis, including VirusTotal integration and file-hash checks.",
      "Includes wireless device discovery and forensic activity logging.",
    ],
    details: {
      overview:
        "Clarionet is an Android mobile-device forensics platform for device inspection, file analysis, and investigation workflows.",
      problem:
        "Device investigations can involve disconnected tools for device access, file review, malware checks, and evidence tracking.",
      solution:
        "Clarionet brings ADB device access and security-analysis workflows into one interface, with wireless discovery and file-level checks described in the project documentation.",
      architecture:
        "The project uses a React and TypeScript frontend with a Node.js server. ADB handles device communication; Socket.IO supports live application updates, and VirusTotal is used for malware analysis.",
      security: [
        "File-hash checks support integrity review during analysis.",
        "VirusTotal integration provides malware-analysis context for files.",
        "The project documents activity logging for forensic workflows.",
      ],
    },
  },
];


function ProjectInformation({
  project,
  onDetails,
}: {
  project: Project;
  onDetails: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="projects-portal-information">
      <div className="projects-portal-copy">
        <div>
          <h4>Purpose</h4>
          <p>{project.purpose}</p>
        </div>
        <div>
          <h4>Project focus</h4>
          <p>{project.headline}</p>
        </div>
      </div>

      <div className="projects-portal-technologies">
        <h4>Technologies &amp; tools</h4>
        <ul className="project-tech-list" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => (
            <li className="project-tech-badge" key={technology}>{technology}</li>
          ))}
        </ul>
        <nav className="projects-portal-actions" aria-label={`${project.name} links`}>
          <button type="button" onClick={onDetails}>
            Details <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}

const CAROUSEL_PROJECTS = PROJECTS.map(({ id, number, name, category, period, demoUrl, repository }) => ({
  id,
  number,
  name,
  category,
  period,
  liveUrl: demoUrl,
  repository,
}));

// ─── Details modal ─────────────────────────────────────────────────────────────

function DetailsModal({
  project,
  onClose,
  returnFocusTo,
}: {
  project: Project;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const main = document.querySelector("main");
    const wasMainInert = main?.hasAttribute("inert") ?? false;
    main?.setAttribute("inert", "");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (main && !wasMainInert) main.removeAttribute("inert");
      returnFocusTo?.focus();
    };
  }, [onClose, returnFocusTo]);

  const d = project.details;

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        className="project-modal-panel"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapFocus}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-overview"
        tabIndex={-1}
      >
        <header className="project-modal-header">
          <span className="project-number">{project.number}</span>
          <div className="project-modal-title-block">
            <p>{project.category}</p>
            <h3 id="project-modal-title">{project.name}</h3>
            <span className="project-modal-headline">{project.headline}</span>
            <span className="project-period">{project.period}</span>
          </div>
          <div className="project-modal-header-actions">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              GitHub <Github size={14} aria-hidden="true" />
            </a>
            <button
              ref={closeRef}
              type="button"
              className="project-modal-close"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="project-modal-body">
          <div className="project-modal-block project-modal-overview">
            <h4>Project overview</h4>
            <p id="project-modal-overview">{d.overview}</p>
          </div>

          <div className="project-modal-two-col">
            <div className="project-modal-block">
              <h4>Problem</h4>
              <p>{d.problem}</p>
            </div>
            <div className="project-modal-block">
              <h4>Solution</h4>
              <p>{d.solution}</p>
            </div>
          </div>

          <div className="project-modal-two-col">
            <div className="project-modal-block">
              <h4>System architecture</h4>
              <p>{d.architecture}</p>
            </div>
            <div className="project-modal-block">
              <h4>Key features</h4>
              <ul className="project-modal-list">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {d.security && d.security.length > 0 && (
            <div className="project-modal-block">
              <h4>Security &amp; privacy mechanisms</h4>
              <ul className="project-modal-list">
                {d.security.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}

          {d.outcomes && d.outcomes.length > 0 && (
            <div className="project-modal-block">
              <h4>Measured results</h4>
              <ul className="project-modal-list">
                {d.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
              </ul>
            </div>
          )}

          <div className="project-modal-block">
            <h4>Technologies &amp; tools</h4>
            <ul className="project-tech-list" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => (
                <li className="project-tech-badge" key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="project-modal-footer">
          <span>{project.number} / 05</span>
          <span>{project.category}</span>
        </footer>
      </motion.div>
    </motion.div>
  );
}

// ─── Projects section ─────────────────────────────────────────────────────────

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [modalMounted, setModalMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => setModalMounted(true), []);

  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];

  const openDetails = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setDetailProject(activeProject);
  }, [activeProject]);

  const closeDetails = useCallback(() => setDetailProject(null), []);

  return (
    <>
      <section id="projects" className="portfolio-section projects-section">
        <div className="portfolio-container">

          <div className="projects-heading-row">
            <SectionHeading
              number="05"
              eyebrow="Selected projects"
              title="Built to solve a problem."
              description="Explore five deployed projects in their live websites. Select the floating project preview inside the site window to move through the work."
            />
            <a
              className="projects-profile-link"
              href="https://github.com/saidurga144"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} aria-hidden="true" />
              GitHub profile
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>


          <div className="projects-portal-shell">
            <PortalCarousel
              projects={CAROUSEL_PROJECTS}
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
              className="project-carousel"
            >
              <ProjectInformation
                project={activeProject}
                onDetails={openDetails}
              />
            </PortalCarousel>
          </div>
        </div>
      </section>

      {modalMounted && createPortal(
        <AnimatePresence>
          {detailProject && (
            <DetailsModal
              key={detailProject.number}
              project={detailProject}
              onClose={closeDetails}
              returnFocusTo={triggerRef.current}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
