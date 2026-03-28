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
    <section id="countdown" className="border-y border-gold/10 bg-white section-y">
      <div className="content-narrow text-center">
        <FadeIn>
          <p className="memora-eyebrow text-gold">{siteConfig.countdown.title}</p>
          <p className="mt-3 font-heading text-sm font-normal tracking-[0.14em] text-muted md:text-[0.9375rem]">
            {siteConfig.weddingDateDisplay}
          </p>
        </FadeIn>

        <FadeIn className="mt-12 md:mt-14" delay={0.1}>
          {remaining.past ? (
            <p className="font-heading text-xl font-normal leading-relaxed text-ink md:text-2xl">
              We’re married — thank you for being part of our story.
            </p>
          ) : (
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5">
              {blocks?.map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl border border-gold/18 bg-white/95 px-3 py-8 shadow-card sm:px-4 sm:py-10"
                >
                  <span className="font-heading text-[clamp(2.25rem,6vw,3.75rem)] tabular-nums leading-none text-ink">
                    {b.label === "Seconds" ? pad(b.value) : b.value}
                  </span>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
