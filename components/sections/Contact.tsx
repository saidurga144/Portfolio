"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const emailAddress = "saikumard912@gmail.com";

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Project discussion");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const contactDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFormOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    contactDialogRef.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsFormOpen(false);
        return;
      }

      if (event.key !== "Tab" || !contactDialogRef.current) return;
      const focusable = contactDialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (focusable.length === 0) return;

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

    window.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeyDown);
      contactTriggerRef.current?.focus();
    };
  }, [isFormOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please complete the required fields. Use a valid email and a message of at least 10 characters.");
      form.querySelector<HTMLElement>(":invalid")?.focus();
      return;
    }

    const mailSubject = encodeURIComponent(`${subject} — portfolio inquiry`);
    const mailBody = encodeURIComponent(`Hello Sai,\n\n${message}\n\n— ${name}\n${email}`);
    try {
      window.location.href = `mailto:${emailAddress}?subject=${mailSubject}&body=${mailBody}`;
      setStatus("Your email app should open with this message ready to review and send.");
    } catch {
      setStatus("The email draft could not be opened. Please email saikumard912@gmail.com directly.");
    }
  };

  return (
    <section id="contact" className="portfolio-section contact-section">
      <div className="portfolio-container">
        <SectionHeading number="07" eyebrow="Contact" title="Start a conversation." description="For opportunities, project discussions, or collaboration, email is the best way to reach me." />

        <div className="contact-layout">
          <div className="contact-details">
            <a href={`mailto:${emailAddress}`} className="contact-detail-card">
              <span className="contact-detail-icon"><Mail size={17} aria-hidden="true" /></span>
              <span><small>Email</small><strong>{emailAddress}</strong></span>
              <ArrowUpRight size={15} className="contact-detail-arrow" aria-hidden="true" />
            </a>
            <a href="tel:+917396295445" className="contact-detail-card">
              <span className="contact-detail-icon"><Phone size={17} aria-hidden="true" /></span>
              <span><small>Phone</small><strong>+91 73962 95445</strong></span>
              <ArrowUpRight size={15} className="contact-detail-arrow" aria-hidden="true" />
            </a>

            <div className="contact-socials">
              <p>Professional links</p>
              <a href="https://linkedin.com/in/sai-kumar-dungala-393538289" target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
              <a href="https://github.com/saidurga144" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
              <button
                ref={contactTriggerRef}
                className="contact-form-trigger"
                type="button"
                aria-label="Open contact form"
                aria-haspopup="dialog"
                aria-expanded={isFormOpen}
                onClick={() => setIsFormOpen(true)}
                title="Write to me"
              >
                <Mail size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && typeof document !== "undefined" && createPortal(
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) setIsFormOpen(false);
          }}
        >
          <div
            ref={contactDialogRef}
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            aria-describedby="contact-form-description"
            tabIndex={-1}
          >
            <button className="contact-modal-close" type="button" aria-label="Close contact form" onClick={() => setIsFormOpen(false)}>
              <X size={17} aria-hidden="true" />
            </button>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-intro">
                <span id="contact-form-title">Write to me</span>
                <p id="contact-form-description">Submitting opens a prefilled email in your mail application.</p>
              </div>
              <div className="contact-form-row">
                <label>Name<input autoComplete="name" name="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label>
                <label>Email<input autoComplete="email" name="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
              </div>
              <label>Topic
                <select name="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                  <option>Project discussion</option><option>Job opportunity</option><option>Collaboration</option><option>Internship</option><option>Other</option>
                </select>
              </label>
              <label>Message<textarea name="message" required minLength={10} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A little context helps me reply." /></label>
              <button type="submit">Prepare email <ArrowUpRight size={16} aria-hidden="true" /></button>
              <p className="contact-status" aria-live="polite" role="status">{status}</p>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
