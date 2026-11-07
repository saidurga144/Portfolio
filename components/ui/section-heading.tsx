import type { ReactNode } from "react";

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({ number, eyebrow, title, description, className = "" }: SectionHeadingProps) {
  return (
    <header className={`section-heading ${className}`}>
      <p className="section-eyebrow"><span>{number}</span>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-heading-description">{description}</p>}
    </header>
  );
}
