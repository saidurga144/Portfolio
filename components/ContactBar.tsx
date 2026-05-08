import { Phone, Mail, Linkedin, Github } from "lucide-react";

export function ContactBar() {
  return (
    <div className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="tel:+917396296445"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Phone size={16} />
            <span>+91 7396296445</span>
          </a>
          <a
            href="mailto:saikumard912@gmail.com"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Mail size={16} />
            <span>saikumard912@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/sai-kumar-dungala-393538289"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/saidurga144"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-orange-400 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
