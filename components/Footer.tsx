"use client";

export function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{ background: "var(--color-bg)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start">
        <p
          className="text-sm tracking-wide"
          style={{
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-space-grotesk)",
            letterSpacing: "0.05em",
          }}
        >
          &copy; 2026 &nbsp;|&nbsp; Design &amp; Built by Dungala Sai Kumar
        </p>
      </div>
    </footer>
  );
}
