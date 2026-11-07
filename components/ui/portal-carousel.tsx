"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import ProjectLivePreview from "@/components/ui/project-live-preview";

// ─── Utilities ────────────────────────────────────────────────────────────────

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PortalCarouselProject {
  id: string;
  number: string;
  name: string;
  category: string;
  period: string;
  liveUrl: string;
  repository: string;
}

export interface PortalCarouselProps {
  projects: PortalCarouselProject[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
  /** Overlay content rendered below the preview (project info, actions). */
  children?: ReactNode;
}

// ─── RollingText: old value slides up, new one rises in ──────────────────────

function RollingText({ value, className = "" }: { value: string; className?: string }) {
  const [state, setState] = useState<{ current: string; previous: string | null }>({
    current: value,
    previous: null,
  });

  if (state.current !== value) {
    setState({ current: value, previous: state.current });
  }

  const currentRef = useRef<HTMLSpanElement>(null);
  const previousRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (state.previous === null) return;
    const incoming = currentRef.current;
    const outgoing = previousRef.current;
    if (!incoming || !outgoing) return;

    const reduced = prefersReducedMotion();
    const tweens = [
      reduced
        ? gsap.fromTo(incoming, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" })
        : gsap.fromTo(incoming, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out" }),
      reduced
        ? gsap.to(outgoing, { opacity: 0, duration: 0.2, ease: "power1.out" })
        : gsap.fromTo(outgoing, { yPercent: 0 }, { yPercent: -110, duration: 0.8, ease: "expo.out" }),
    ];
    return () => tweens.forEach((t) => t.kill());
  }, [state]);

  return (
    <span
      className={`relative -mb-[0.2em] inline-block overflow-y-clip whitespace-nowrap pb-[0.2em] align-bottom ${className}`}
    >
      <span ref={currentRef} className="block">
        {state.current}
      </span>
      {state.previous !== null && (
        <span ref={previousRef} aria-hidden="true" className="absolute inset-x-0 top-0 block">
          {state.previous}
        </span>
      )}
    </span>
  );
}

// ─── Expanding transition: reveals the next live site from the navigation point ──

function PreviewTransition({
  projectId,
  revealFrom,
  children,
}: {
  projectId: string;
  revealFrom: { clientX: number; clientY: number } | null;
  children: ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const prevIdRef = useRef(projectId);

  useIsomorphicLayoutEffect(() => {
    if (prevIdRef.current === projectId) return;
    prevIdRef.current = projectId;

    const element = wrapRef.current?.querySelector<HTMLElement>(".project-browser-viewport");
    if (!element || prefersReducedMotion()) return;

    const rect = element.getBoundingClientRect();
    const x = revealFrom
      ? Math.max(0, Math.min(rect.width, revealFrom.clientX - rect.left))
      : rect.width / 2;
    const y = revealFrom
      ? Math.max(0, Math.min(rect.height, revealFrom.clientY - rect.top))
      : rect.height / 2;
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y),
    );

    const tween = gsap.fromTo(
      element,
      { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.88 },
      {
        clipPath: `circle(${radius + 2}px at ${x}px ${y}px)`,
        opacity: 1,
        duration: 0.9,
        ease: "expo.out",
        onComplete: () => { gsap.set(element, { clearProps: "clipPath,opacity" }); },
      },
    );
    return () => { tween.kill(); };
  }, [projectId, revealFrom]);

  return (
    <div ref={wrapRef} className="project-preview-transition-wrap">
      {children}
    </div>
  );
}

// ─── PortalCarousel ───────────────────────────────────────────────────────────

export default function PortalCarousel({
  projects,
  activeIndex,
  onIndexChange,
  className = "",
  children,
}: PortalCarouselProps) {
  const count = projects.length;
  const [revealFrom, setRevealFrom] = useState<{ clientX: number; clientY: number } | null>(null);

  const index = ((activeIndex % count) + count) % count;
  const project = projects[index];
  const nextProject = projects[(index + 1) % count];

  const advance = (event?: Pick<ReactMouseEvent<HTMLDivElement>, "clientX" | "clientY" | "detail">) => {
    if (count < 2) return;
    setRevealFrom(event && event.detail > 0 ? { clientX: event.clientX, clientY: event.clientY } : null);
    onIndexChange((index + 1) % count);
  };

  if (count === 0) return null;

  const advanceFromPhoto = (point: { clientX: number; clientY: number }) => {
    if (count < 2) return;
    setRevealFrom(point);
    onIndexChange((index + 1) % count);
  };

  const onRootClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // The live preview is an actual, interactive website. Its clicks and scrolls
    // must never be interpreted as carousel navigation.
    if (
      target.closest(
        "a, button, input, select, textarea, [role='button'], iframe, .project-preview-transition-wrap, .project-browser-preview",
      )
    ) {
      return;
    }

    advance(event);
  };

  const onRootKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || count < 2) return;
    if (event.key !== "Enter" && event.key !== " " && event.key !== "ArrowRight") return;
    event.preventDefault();
    advance();
  };

  return (
    <div
      className={`project-live-showcase ${className}`}
      onClick={onRootClick}
      onKeyDown={onRootKeyDown}
      role="region"
      aria-roledescription="project carousel"
      aria-label="Project previews. Click outside the live website to explore the next project."
      aria-describedby="project-showcase-interaction-hint"
      tabIndex={0}
    >
      {/* ── Heading row: animated project title + nav ── */}
      <div
        className="project-showcase-heading"
      >
        <div className="project-showcase-heading-copy">
          <div className="project-showcase-meta" aria-label="Project information">
            <RollingText value={project.number} />
            <span aria-hidden="true">/ {String(count).padStart(2, "0")}</span>
            <i aria-hidden="true" />
            <span>{project.category}</span>
            <i aria-hidden="true" />
            <span>{project.period}</span>
          </div>
          <h3 aria-live="polite">
            <RollingText
              value={project.name}
              className="text-[clamp(30px,4vw,54px)] font-normal leading-[1.05] tracking-tight"
            />
          </h3>
        </div>

        <div className="project-showcase-controls">
          <div className="project-showcase-links" aria-label={`${project.name} project links`}>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ExternalLink size={13} aria-hidden="true" />
            </a>
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              GitHub <Github size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="project-showcase-navigation" aria-label="Project position">
            <span
              className="project-showcase-navigation-count"
              aria-live="polite"
              aria-atomic="true"
            >
              <RollingText value={String(index + 1).padStart(2, "0")} />
              <span> / </span>
              <span>{String(count).padStart(2, "0")}</span>
            </span>
          </div>
          <p className="project-showcase-interaction-hint" id="project-showcase-interaction-hint">
            Select the preview image inside the site window to reveal the next project <ArrowUpRight size={12} aria-hidden="true" />
          </p>
        </div>
      </div>

      {/* ── Live preview (animated slide-in on project change) ── */}
      <PreviewTransition projectId={project.id} revealFrom={revealFrom}>
        <ProjectLivePreview
          key={project.id}
          project={project}
          nextProject={nextProject}
          onNextProject={advanceFromPhoto}
        />
      </PreviewTransition>

      {/* ── Project info / actions (children from Projects.tsx) ── */}
      <div className="project-showcase-details">{children}</div>
    </div>
  );
}
