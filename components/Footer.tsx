import DoodleCrewFooter from "@/components/ui/doodle-crew-footer-sunny";

export function Footer() {
  return (
    <DoodleCrewFooter
      wordmark="SAI KUMAR"
      brand="Sai Kumar"
      blurb="Cybersecurity · Software development"
      tagline="Thoughtful software. Stronger systems."
      columns={[]}
      actions={[
        { label: "View projects", href: "#projects", icon: "sparkle", variant: "outline" },
        { label: "Get in touch", href: "#contact", icon: "bolt", variant: "solid" },
      ]}
      copyright="© 2026 Sai Kumar Dungala · India"
      legal={[]}
      socials={[]}
      backToTop
      doodleCount={10}
      preset="night"
      palette={{ background: "#100d0c", ink: "#f6eee6", accent: "#e57f61" }}
      height="760px"
      className="portfolio-doodle-footer"
    />
  );
}
