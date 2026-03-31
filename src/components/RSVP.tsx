"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxbui4BrEQBs5dOReOsv_EZ2jMaB9a0RnLqsq08TJYaL9SnDAlp0XxQdO3FR1v2ESvb/exec";

const inputClass =
  "mt-2.5 w-full rounded-xl border border-gold/15 bg-white/70 px-4 py-2.5 font-body text-[0.9375rem] text-ink outline-none backdrop-blur-sm transition duration-300 ease-cinematic placeholder:text-muted/55 focus:border-[var(--memora-primary)] focus:ring-2 focus:ring-[var(--memora-primary)]/20 md:py-3 md:text-base";

export function RSVP() {
  const { rsvp } = siteConfig;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  if (!rsvp.enabled) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    setSending(true);

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .catch(() => {})
      .finally(() => {
        setSending(false);
        setSubmitted(true);
        e.currentTarget?.reset();
      });
  }

  return (
    <section id="rsvp" className="border-t border-gold/10 bg-blush section-y">
      <div className="content-narrow">
        <FadeIn className="text-center">
          <p className="memora-eyebrow text-gold">We hope you can join us</p>
          <h2 className="memora-section-title mt-3 text-ink">{rsvp.title}</h2>
          <p className="memora-section-lead mx-auto mt-7 max-w-md">{rsvp.subtitle}</p>
        </FadeIn>

        <FadeIn className="mt-12 md:mt-14" delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="space-y-7 rounded-2xl border border-gold/15 bg-white/80 p-8 shadow-card backdrop-blur-md md:space-y-8 md:p-10"
          >
            <div>
              <label htmlFor="rsvp-name" className="block text-[10px] uppercase tracking-[0.22em] text-muted">
                Full name
              </label>
              <input
                id="rsvp-name"
                name="name"
                required
                autoComplete="name"
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="rsvp-email" className="block text-[10px] uppercase tracking-[0.22em] text-muted">
                Email
              </label>
              <input
                id="rsvp-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <fieldset>
              <legend className="text-[10px] uppercase tracking-[0.22em] text-muted">Will you attend?</legend>
              <div className="mt-4 flex flex-wrap gap-8">
                <label className="flex cursor-pointer items-center gap-2 font-body text-[0.9375rem] text-ink md:text-base">
                  <input type="radio" name="attending" value="yes" required className="accent-[var(--memora-primary)]" />
                  Joyfully accepts
                </label>
                <label className="flex cursor-pointer items-center gap-2 font-body text-[0.9375rem] text-ink md:text-base">
                  <input type="radio" name="attending" value="no" className="accent-[var(--memora-primary)]" />
                  Regretfully declines
                </label>
              </div>
            </fieldset>
            <div>
              <label htmlFor="rsvp-guests" className="block text-[10px] uppercase tracking-[0.22em] text-muted">
                Number of guests (including you)
              </label>
              <input
                id="rsvp-guests"
                name="guests"
                type="number"
                min={1}
                max={20}
                defaultValue={1}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="rsvp-message" className="block text-[10px] uppercase tracking-[0.22em] text-muted">
                Message (optional)
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Dietary notes or a sweet note for the couple"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl border border-gold/20 bg-gradient-to-b from-gold/15 to-gold/10 py-3 font-heading text-[10px] uppercase tracking-[0.24em] text-ink transition duration-300 ease-cinematic hover:from-gold/25 hover:to-gold/20 disabled:opacity-60 md:py-3.5 md:text-xs"
            >
              {sending ? "Sending…" : "Send RSVP"}
            </button>
            {submitted ? (
              <p className="text-center text-[0.9375rem] leading-relaxed text-muted" role="status">
                Thank you! Your RSVP has been received. We look forward to celebrating with you! 🎉
              </p>
            ) : null}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
