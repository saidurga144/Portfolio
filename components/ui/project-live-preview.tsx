"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Maximize2, Minimize2, RotateCw, ShieldAlert } from "lucide-react";

type ProjectPreviewInfo = {
  id: string;
  name: string;
  liveUrl: string;
};

type NextProjectPreview = {
  id: string;
  number: string;
  name: string;
  liveUrl: string;
};

type RevealPoint = { clientX: number; clientY: number };

type PolicyState = "checking" | "allowed" | "blocked" | "unknown";

type PolicyResult = {
  state: Exclude<PolicyState, "checking">;
  reason?: string;
  statusCode?: number;
  portfolioOrigin?: string;
  xFrameOptions?: string;
  frameAncestors?: string;
};

export default function ProjectLivePreview({
  project,
  nextProject,
  onNextProject,
}: {
  project: ProjectPreviewInfo;
  nextProject: NextProjectPreview;
  onNextProject: (point: RevealPoint) => void;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const nextPortalRef = useRef<HTMLDivElement>(null);
  const [nextPolicy, setNextPolicy] = useState<PolicyState>("checking");
  const [portalScale, setPortalScale] = useState(0.14);
  const [policy, setPolicy] = useState<PolicyState>("checking");
  const [reason, setReason] = useState("");
  const [policyDetails, setPolicyDetails] = useState<PolicyResult | null>(null);
  const [frameResponded, setFrameResponded] = useState(false);
  const [revision, setRevision] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setNextPolicy("checking");

    fetch(`/api/project-embed-check?project=${encodeURIComponent(nextProject.id)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Next project preview check was unavailable.");
        return await response.json() as PolicyResult;
      })
      .then((result) => setNextPolicy(result.state))
      .catch(() => {
        if (!controller.signal.aborted) setNextPolicy("unknown");
      });

    return () => controller.abort();
  }, [nextProject.id]);

  useEffect(() => {
    const element = nextPortalRef.current;
    if (!element) return;

    const resize = () => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setPortalScale(Math.min(rect.width / 1600, rect.height / 1067));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [nextProject.id]);

  useEffect(() => {
    const controller = new AbortController();
    setPolicy("checking");
    setReason("");
    setPolicyDetails(null);
    setFrameResponded(false);

    fetch(`/api/project-embed-check?project=${encodeURIComponent(project.id)}`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Frame policy check was unavailable.");
        return await response.json() as PolicyResult;
      })
      .then((result) => {
        setPolicyDetails(result);
        setPolicy(result.state);
        setReason(result.reason ?? "");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setPolicy("unknown");
        setReason(error instanceof Error ? error.message : "Frame policy could not be checked.");
      });

    return () => controller.abort();
  }, [project.id, revision]);

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === previewRef.current);
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const refresh = useCallback(() => {
    setRevision((current) => current + 1);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const element = previewRef.current;
    if (!element) return;
    try {
      if (document.fullscreenElement === element) await document.exitFullscreen();
      else await element.requestFullscreen();
    } catch {
      // Fullscreen can be unavailable in embedded browsers; the live link remains available.
    }
  }, []);

  const domain = new URL(project.liveUrl).hostname;
  const portfolioOrigin = policyDetails?.portfolioOrigin || "https://your-portfolio-domain";
  const recommendedPolicy = `Content-Security-Policy: frame-ancestors 'self' ${portfolioOrigin};`;
  const showFrame = policy === "allowed" || policy === "unknown";

  return (
    <div
      ref={previewRef}
      className="project-browser-preview"
      aria-label={`${project.name} live website preview`}
      aria-busy={policy === "checking" || (showFrame && !frameResponded)}
    >
      <div className="project-browser-toolbar">
        <div className="project-browser-identity">
          <div className="project-browser-lights" aria-hidden="true"><i /><i /><i /></div>
          <span className="project-browser-project-name" title={project.name}>{project.name}</span>
          <span className="project-browser-domain" title={project.liveUrl}>{domain}</span>
        </div>
        <div className="project-browser-controls" aria-label="Preview controls">
          <button type="button" onClick={refresh} aria-label="Refresh live preview" title="Refresh preview">
            <RotateCw size={15} aria-hidden="true" />
          </button>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Open live website in a new tab" title="Open in new tab">
            <ExternalLink size={15} aria-hidden="true" />
          </a>
          <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit full-screen preview" : "View preview full screen"} title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {isFullscreen ? <Minimize2 size={15} aria-hidden="true" /> : <Maximize2 size={15} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {policy === "unknown" && (
        <div className="project-embed-notice project-embed-notice-warning" role="status">
          <ShieldAlert size={15} aria-hidden="true" />
          <span>{reason || "Could not verify the site's embedding policy. Trying the live preview; if it stays blank, open the site in a new tab."}</span>
        </div>
      )}

      <div className="project-browser-viewport">
        {policy === "checking" && (
          <div className="project-embed-state" role="status">
            <span className="project-preview-spinner" aria-hidden="true" />
            <span>Checking whether this site allows an embedded preview…</span>
          </div>
        )}

        {policy === "blocked" && (
          <div className="project-embed-state project-embed-state-blocked" role="status">
            <ShieldAlert size={22} aria-hidden="true" />
            <h4>Embedded preview is blocked</h4>
            <p>{reason || "The website's security policy does not permit this portfolio to display it here."}</p>
            <div className="project-embed-blocked-domain">
              <span>{new URL(project.liveUrl).hostname}</span>
            </div>
            {(policyDetails?.xFrameOptions || policyDetails?.frameAncestors) && (
              <div className="project-embed-response-headers" aria-label="Detected frame policy headers">
                <span>Detected response policy</span>
                {policyDetails.xFrameOptions && <code>X-Frame-Options: {policyDetails.xFrameOptions}</code>}
                {policyDetails.frameAncestors && <code>frame-ancestors {policyDetails.frameAncestors}</code>}
              </div>
            )}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit {project.name} live <ExternalLink size={14} aria-hidden="true" />
            </a>
            <p className="project-embed-fix-hint">
              If you control this deployment, set this response header and remove any conflicting
              <code> X-Frame-Options</code> restriction:
            </p>
            <pre className="project-embed-fix-code">{recommendedPolicy}</pre>
          </div>
        )}

        {showFrame && (
          <>
            {!frameResponded && (
              <div className="project-embed-loading" role="status">
                <span className="project-preview-spinner" aria-hidden="true" />
                <span>Loading {project.name}…</span>
              </div>
            )}
            <iframe
              key={`${project.id}-${revision}`}
              className="project-live-iframe"
              src={project.liveUrl}
              title={`${project.name} live website`}
              loading="eager"
              allow="fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              data-loaded={frameResponded ? "true" : "false"}
              onLoad={() => setFrameResponded(true)}
            />
          </>
        )}

        <div ref={nextPortalRef} className="project-photo-portal">
          {nextPolicy !== "blocked" ? (
            <iframe
              className="project-photo-portal-frame"
              src={nextProject.liveUrl}
              title={`${nextProject.name} original landing page preview`}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
              sandbox="allow-scripts allow-same-origin allow-forms"
              referrerPolicy="no-referrer"
              style={{ transform: `scale(${portalScale})` }}
            />
          ) : (
            <span className="project-photo-portal-unavailable" aria-hidden="true">
              Live preview opens in a new tab
            </span>
          )}
          <span className="project-photo-portal-shade" aria-hidden="true" />
          <button
            type="button"
            className="project-photo-portal-action"
            aria-label={`Show next project: ${nextProject.name}`}
            title={`Next project: ${nextProject.name}`}
            onClick={(event) => {
              event.stopPropagation();
              const rect = event.currentTarget.getBoundingClientRect();
              onNextProject(event.detail > 0
                ? { clientX: event.clientX, clientY: event.clientY }
                : { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
            }}
          >
            <span className="project-photo-portal-label">Next project · {nextProject.number}</span>
            <strong>{nextProject.name}</strong>
            <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
