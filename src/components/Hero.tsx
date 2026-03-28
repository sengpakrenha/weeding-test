import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  const { couple, weddingDateDisplay, hero } = siteConfig;

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/60"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-cream">
        <p
          className="mb-4 font-script text-2xl text-gold-light sm:text-3xl md:text-4xl motion-safe:animate-fade-in"
          style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}
        >
          {couple.invitationLine}
        </p>
        <h1 className="font-serif text-4xl font-light tracking-wide sm:text-5xl md:text-6xl lg:text-7xl motion-safe:animate-fade-up">
          <span className="block sm:inline">{couple.partner1}</span>
          <span className="mx-2 font-script text-gold-light sm:mx-4">&</span>
          <span className="block sm:inline">{couple.partner2}</span>
        </h1>
        <div
          className="mx-auto mt-10 h-px w-24 bg-gold/80 motion-safe:animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        />
        <p
          className="mt-8 font-serif text-lg tracking-[0.2em] text-cream/90 sm:text-xl motion-safe:animate-fade-in"
          style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}
        >
          {weddingDateDisplay}
        </p>
        <p
          className="mt-4 font-serif text-sm italic text-cream/75 sm:text-base motion-safe:animate-fade-in"
          style={{ animationDelay: "0.7s", opacity: 0, animationFillMode: "forwards" }}
        >
          {hero.subtitle}
        </p>
      </div>

      <a
        href="#story"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/80 transition hover:text-gold-light"
        aria-label="Scroll to our story"
      >
        <span className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em]">
          <span className="inline-block h-8 w-px bg-gradient-to-b from-gold-light to-transparent motion-safe:animate-pulse" />
        </span>
      </a>
    </section>
  );
}
