import { NextRequest, NextResponse } from "next/server";
import { PROJECT_LIVE_SITES, type ProjectLiveSiteId } from "@/lib/project-live-sites";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type EmbedCheck = {
  state: "allowed" | "blocked" | "unknown";
  requestedUrl: string;
  finalUrl?: string;
  statusCode?: number;
  reason?: string;
  xFrameOptions?: string;
  frameAncestors?: string;
};

function portfolioOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || new URL(request.url).protocol.slice(0, -1);
  if (!host || !/^[a-z0-9.:[\]-]+$/i.test(host) || !["http", "https"].includes(protocol)) return new URL(request.url).origin;
  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return new URL(request.url).origin;
  }
}

function sourceAllowsParent(source: string, parentOrigin: string, responseOrigin: string) {
  const value = source.toLowerCase();
  if (value === "*") return true;
  if (value === "'self'") return parentOrigin === responseOrigin;
  if (value === "'none'" || value.startsWith("'")) return false;
  if (value === "https:" || value === "http:") return new URL(parentOrigin).protocol === value;

  try {
    const sourceUrl = new URL(value);
    const parentUrl = new URL(parentOrigin);
    if (sourceUrl.protocol !== parentUrl.protocol) return false;
    const sourceHost = sourceUrl.hostname;
    if (sourceHost.startsWith("*.")) {
      const suffix = sourceHost.slice(1);
      return parentUrl.hostname.endsWith(suffix) && parentUrl.hostname !== suffix.slice(1) &&
        (sourceUrl.port || "") === parentUrl.port;
    }
    return sourceUrl.origin === parentOrigin;
  } catch {
    return false;
  }
}

function frameAncestorPolicies(csp: string) {
  return csp.split(",").flatMap((policy) => {
    const directive = policy
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.toLowerCase().startsWith("frame-ancestors "));
    return directive ? [directive.slice("frame-ancestors ".length).trim()] : [];
  });
}

async function inspectSite(requestedUrl: string, parentOrigin: string): Promise<Omit<EmbedCheck, "requestedUrl">> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(requestedUrl, {
      method: "GET",
      headers: {
        accept: "text/html,application/xhtml+xml",
        range: "bytes=0-0",
      },
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });

    const finalUrl = response.url || requestedUrl;
    const statusCode = response.status;
    const xFrameOptions = response.headers.get("x-frame-options")?.trim();
    const csp = response.headers.get("content-security-policy") ?? "";
    const policies = frameAncestorPolicies(csp);
    const frameAncestors = policies.join("; ");
    const responseOrigin = new URL(finalUrl).origin;

    // Cancel immediately after headers; this route only needs response metadata.
    await response.body?.cancel().catch(() => undefined);

    if (!response.ok) {
      return {
        state: "unknown",
        finalUrl,
        statusCode,
        reason: `The site returned HTTP ${statusCode}; its frame policy could not be confirmed.`,
        xFrameOptions: xFrameOptions || undefined,
        frameAncestors: frameAncestors || undefined,
      };
    }

    if (policies.length) {
      const blockedPolicy = policies.find((policy) => {
        const sources = policy.split(/\s+/).filter(Boolean);
        return sources.length === 0 || !sources.some((source) => sourceAllowsParent(source, parentOrigin, responseOrigin));
      });
      if (blockedPolicy) {
        return {
          state: "blocked",
          finalUrl,
          statusCode,
          reason: `Content-Security-Policy frame-ancestors ${blockedPolicy} does not allow ${parentOrigin}.`,
          xFrameOptions: xFrameOptions || undefined,
          frameAncestors,
        };
      }
      // Enforced frame-ancestors takes precedence over X-Frame-Options in modern browsers.
      return { state: "allowed", finalUrl, statusCode, frameAncestors, xFrameOptions: xFrameOptions || undefined };
    }

    const xfo = xFrameOptions?.toLowerCase();
    if (xfo?.includes("deny")) {
      return { state: "blocked", finalUrl, statusCode, reason: "X-Frame-Options: DENY prevents embedding.", xFrameOptions };
    }
    if (xfo?.includes("sameorigin") && parentOrigin !== responseOrigin) {
      return {
        state: "blocked",
        finalUrl,
        statusCode,
        reason: `X-Frame-Options: SAMEORIGIN only permits ${responseOrigin}.`,
        xFrameOptions,
      };
    }
    if (xfo && !xfo.toLowerCase().includes("sameorigin")) {
      return { state: "unknown", finalUrl, statusCode, reason: `Unrecognized X-Frame-Options value: ${xFrameOptions}.`, xFrameOptions };
    }

    return { state: "allowed", finalUrl, statusCode, xFrameOptions: xFrameOptions || undefined };
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError"
      ? "The site did not respond before the frame-policy check timed out."
      : "The site could not be reached from the portfolio server to check its frame policy.";
    return { state: "unknown", reason };
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("project") as ProjectLiveSiteId | null;
  if (!id || !Object.hasOwn(PROJECT_LIVE_SITES, id)) {
    return NextResponse.json({ error: "Unknown project." }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const requestedUrl = PROJECT_LIVE_SITES[id];
  const parentOrigin = portfolioOrigin(request);
  const result = await inspectSite(requestedUrl, parentOrigin);
  return NextResponse.json(
    { requestedUrl, portfolioOrigin: parentOrigin, ...result },
    { headers: { "Cache-Control": "no-store" } },
  );
}
