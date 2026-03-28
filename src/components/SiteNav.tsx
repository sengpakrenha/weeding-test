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

type SiteNavProps = {
  /** Hide entire nav while the cover invitation is visible */
  visible?: boolean;
};

export function SiteNav({ visible = true }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ease-cinematic ${
        scrolled ? "bg-cream/95 py-3 shadow-card backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#home"
          className={`font-script text-xl transition md:text-2xl ${
            scrolled ? "text-gold-dark" : "text-cream"
          }`}
        >
          {siteConfig.couple.partner1} & {siteConfig.couple.partner2}
        </a>
        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[11px] uppercase tracking-[0.22em] transition ${
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
          className="border-t border-sand/80 bg-cream/98 px-6 py-5 backdrop-blur-md md:hidden"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-[0.2em] text-muted"
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
