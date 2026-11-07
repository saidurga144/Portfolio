import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero";

/** The portfolio's editorial hero, with the interactive mascot as its focal point. */
export function Hero() {
  return (
    <section id="hero" className="morrow-mascot-hero">
      <MascotPortfolioHero
        className="morrow-mascot-art"
        index="01/01"
        discipline="Cybersecurity"
        tagline="Building secure digital experiences"
        collection={["Portfolio", "2026"]}
        reel={["Sai Kumar Dungala", "India"]}
        year="Sai"
        initials="Kumar"
        badge="Dungala"
        badgeSuffix=""
        line2="Cyber"
        line3="Security"
        word="Portfolio"
        verticalTag="CSE"
        bracketed="01"
        seekingLabel="Explore"
        seeking="Projects"
        href="#projects"
        services={["Application Security", "Full-Stack Development", "Cloud Systems"]}
        greetings={[
          "Hi, I’m Sai Kumar Dungala.",
          "I build secure digital experiences.",
          "Have a look around the portfolio.",
        ]}
        skin="#f4c6a8"
        beanie="#2b211d"
        shirt="#211a17"
        tag="#e57f61"
        accent="#e57f61"
        paper="#120f0e"
        ink="#f6eee6"
      />
    </section>
  );
}
