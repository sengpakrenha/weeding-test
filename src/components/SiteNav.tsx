"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "#story", label: "Story" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#countdown", label: "Countdown" },
  ...(siteConfig.wishes.enabled ? [{ href: "#wishes", label: "Wishes" }] : []),
  ...(siteConfig.rsvp.enabled ? [{ href: "#rsvp", label: "RSVP" }] : []),
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-cream/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className={`font-script text-xl transition md:text-2xl ${
            scrolled ? "text-gold-dark" : "text-cream"
          }`}
        >
          {siteConfig.couple.partner1} & {siteConfig.couple.partner2}
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-xs uppercase tracking-[0.2em] transition ${
                scrolled
                  ? "text-muted hover:text-gold-dark"
                  : "text-cream/90 hover:text-gold-light"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={`md:hidden ${scrolled ? "text-ink" : "text-cream"}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-sand bg-cream px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm uppercase tracking-widest text-muted"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
