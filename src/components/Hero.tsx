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
          className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/38 to-ink/65"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(20,18,16,0.35)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-8 py-32 text-center text-cream sm:py-36">
        <p
          className="mb-6 font-script text-3xl text-gold-light sm:text-4xl md:text-5xl motion-safe:animate-fade-in"
          style={{ animationDelay: "0.12s", opacity: 0, animationFillMode: "forwards" }}
        >
          {couple.invitationLine}
        </p>
        <h1 className="font-serif text-4xl font-normal tracking-[0.02em] sm:text-5xl md:text-6xl lg:text-7xl motion-safe:animate-fade-up">
          <span className="block sm:inline">{couple.partner1}</span>
          <span className="mx-3 font-script text-gold-light sm:mx-5">&</span>
          <span className="block sm:inline">{couple.partner2}</span>
        </h1>
        <div
          className="mx-auto mt-12 h-px w-36 bg-gradient-to-r from-transparent via-gold/85 to-transparent motion-safe:animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        />
        <p
          className="mt-10 font-serif text-lg tracking-[0.24em] text-cream/92 sm:text-xl md:text-2xl motion-safe:animate-fade-in"
          style={{ animationDelay: "0.52s", opacity: 0, animationFillMode: "forwards" }}
        >
          {weddingDateDisplay}
        </p>
        <p
          className="mx-auto mt-6 max-w-md font-serif text-sm italic leading-relaxed text-cream/78 sm:text-base motion-safe:animate-fade-in"
          style={{ animationDelay: "0.65s", opacity: 0, animationFillMode: "forwards" }}
        >
          {hero.subtitle}
        </p>
      </div>

      <a
        href="#story"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-cream/75 transition duration-300 hover:text-gold-light"
        aria-label="Scroll to our story"
      >
        <span className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em]">
          Scroll
          <span className="inline-block h-10 w-px bg-gradient-to-b from-gold-light/90 to-transparent motion-safe:animate-pulse" />
        </span>
      </a>
    </section>
  );
}
