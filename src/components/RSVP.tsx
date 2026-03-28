"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function RSVP() {
  const { rsvp } = siteConfig;
  const [submitted, setSubmitted] = useState(false);

  if (!rsvp.enabled) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    console.log("RSVP (frontend only — not sent):", data);
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <section id="rsvp" className="section-y bg-blush">
      <div className="mx-auto max-w-lg px-6 sm:px-8">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl lg:text-[2.75rem]">We hope you can join us</p>
          <h2 className="mt-5 font-serif text-3xl font-normal text-ink md:text-4xl">{rsvp.title}</h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">{rsvp.subtitle}</p>
        </FadeIn>

        <FadeIn className="mt-14 md:mt-16" delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 border border-gold/20 bg-white/80 p-10 shadow-card backdrop-blur-sm md:p-12"
          >
            <div>
              <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-[0.2em] text-muted">
                Full name
              </label>
              <input
                id="rsvp-name"
                name="name"
                required
                autoComplete="name"
                className="mt-3 w-full border-b border-sand bg-transparent px-0 py-2.5 font-serif text-ink outline-none transition focus:border-gold"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="rsvp-email" className="block text-xs uppercase tracking-[0.2em] text-muted">
                Email
              </label>
              <input
                id="rsvp-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-3 w-full border-b border-sand bg-transparent px-0 py-2.5 font-serif text-ink outline-none transition focus:border-gold"
                placeholder="you@example.com"
              />
            </div>
            <fieldset>
              <legend className="text-xs uppercase tracking-[0.2em] text-muted">Will you attend?</legend>
              <div className="mt-4 flex flex-wrap gap-8">
                <label className="flex cursor-pointer items-center gap-2 font-serif text-ink">
                  <input type="radio" name="attending" value="yes" required className="accent-gold" />
                  Joyfully accepts
                </label>
                <label className="flex cursor-pointer items-center gap-2 font-serif text-ink">
                  <input type="radio" name="attending" value="no" className="accent-gold" />
                  Regretfully declines
                </label>
              </div>
            </fieldset>
            <div>
              <label htmlFor="rsvp-guests" className="block text-xs uppercase tracking-[0.2em] text-muted">
                Number of guests (including you)
              </label>
              <input
                id="rsvp-guests"
                name="guests"
                type="number"
                min={1}
                max={20}
                defaultValue={1}
                className="mt-3 w-full border-b border-sand bg-transparent px-0 py-2.5 font-serif text-ink outline-none transition focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="rsvp-message" className="block text-xs uppercase tracking-[0.2em] text-muted">
                Message (optional)
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={3}
                className="mt-3 w-full resize-y border border-sand bg-white/60 px-4 py-3 font-serif text-ink outline-none transition focus:border-gold"
                placeholder="Dietary notes or a sweet note for the couple"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-gold bg-gold/10 py-3.5 font-serif text-xs uppercase tracking-[0.22em] text-ink transition duration-300 ease-cinematic hover:bg-gold/25"
            >
              Send RSVP
            </button>
            {submitted ? (
              <p className="text-center text-sm text-muted" role="status">
                Thank you — your details were logged in the browser only. Connect a backend or form
                service when you are ready.
              </p>
            ) : null}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
