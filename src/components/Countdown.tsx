"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
};

function getRemaining(target: Date): Remaining {
  const now = Date.now();
  const end = target.getTime();
  const diff = end - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    past: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const target = useMemo(() => new Date(siteConfig.weddingDateISO), []);
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining(target));

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(getRemaining(target));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const blocks = remaining.past
    ? null
    : [
        { label: "Days", value: remaining.days },
        { label: "Hours", value: remaining.hours },
        { label: "Minutes", value: remaining.minutes },
        { label: "Seconds", value: remaining.seconds },
      ];

  return (
    <section id="countdown" className="border-y border-gold/15 bg-white section-y">
      <div className="content-narrow text-center">
        <FadeIn>
          <p className="font-script text-3xl text-gold md:text-4xl lg:text-[2.75rem]">
            {siteConfig.countdown.title}
          </p>
          <p className="mt-4 font-serif text-lg text-muted md:text-xl">{siteConfig.weddingDateDisplay}</p>
        </FadeIn>

        <FadeIn className="mt-14 md:mt-16" delay={0.1}>
          {remaining.past ? (
            <p className="font-serif text-2xl font-normal leading-relaxed text-ink md:text-3xl">
              We’re married — thank you for being part of our story.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {blocks?.map((b) => (
                <div
                  key={b.label}
                  className="border border-gold/25 bg-cream/90 px-4 py-8 shadow-card sm:py-10"
                >
                  <span className="font-serif text-3xl tabular-nums text-ink sm:text-4xl md:text-5xl">
                    {b.label === "Seconds" ? pad(b.value) : b.value}
                  </span>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
