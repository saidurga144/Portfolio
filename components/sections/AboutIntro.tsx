const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
];

export function AboutIntro() {
  return (
    <section className="portfolio-intro" aria-label="Portfolio overview">
      <div className="portfolio-intro-inner mx-auto grid max-w-[1440px] gap-9 px-6 py-16 sm:px-10 md:grid-cols-[1fr_auto] md:items-end lg:px-20 lg:py-20">
        <div className="max-w-[850px]">
          <p className="section-eyebrow"><span>01</span> A quick introduction</p>
          <h2 className="portfolio-intro-title">Cybersecurity and software, <span>grounded in computer science.</span></h2>
          <p className="portfolio-intro-copy">I&apos;m studying Computer Science Engineering with a cybersecurity focus at Kalasalingam Academy of Research and Education.</p>
        </div>
        <nav className="portfolio-section-pills flex flex-wrap gap-2 md:max-w-[310px] md:justify-end" aria-label="Explore portfolio sections">
          {links.map((link) => <a href={link.href} key={link.label}>{link.label}<span aria-hidden="true">↗</span></a>)}
        </nav>
      </div>
      <div className="portfolio-intro-rule mx-auto max-w-[1280px]" />
    </section>
  );
}
