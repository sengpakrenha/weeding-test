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
          className="absolute inset-0 bg-gradient-to-b from-black/65 via-ink/45 to-black/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_0%,rgba(0,0,0,0.4)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-28 text-center text-cream sm:px-6 sm:py-32 md:py-36">
        <p
          className="memora-hero-eyebrow text-[var(--memora-text-gold)] drop-shadow-md motion-safe:animate-fade-in"
          style={{ animationDelay: "0.12s", opacity: 0, animationFillMode: "forwards" }}
        >
          {couple.invitationLine}
        </p>
        <h1 className="memora-hero-names mt-4 text-white drop-shadow-md motion-safe:animate-fade-up">
          <span className="block sm:inline">{couple.partner1}</span>
          <span className="memora-hero-ampersand mx-2 inline-block text-[var(--memora-primary)] sm:mx-4">
            &
          </span>
          <span className="block sm:inline">{couple.partner2}</span>
        </h1>
        <div
          className="section-divider mx-auto mt-8 max-w-[13rem] motion-safe:animate-fade-in"
          style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}
        />
        <p
          className="memora-date-line mt-8 text-white/95 motion-safe:animate-fade-in"
          style={{ animationDelay: "0.52s", opacity: 0, animationFillMode: "forwards" }}
        >
          {weddingDateDisplay}
        </p>
        <div
          className="mx-auto mt-6 max-w-2xl motion-safe:animate-fade-in"
          style={{ animationDelay: "0.65s", opacity: 0, animationFillMode: "forwards" }}
        >
          {hero.subtitle.split("\n").map((line, i) => (
            <p
              key={i}
              className={`text-center font-body leading-relaxed ${
                i === 0
                  ? "text-base font-khmer-heading text-[var(--memora-primary)] sm:text-lg"
                  : "mt-3 text-[0.9375rem] text-cream/88 sm:text-base"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <a
        href="#story"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-cream/78 transition duration-500 ease-cinematic hover:text-[var(--memora-primary)]"
        aria-label="Scroll to our story"
      >
        <span className="flex flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.32em]">
          Scroll
          <span className="inline-block h-9 w-px bg-gradient-to-b from-[var(--memora-primary)]/90 to-transparent motion-safe:animate-pulse" />
        </span>
      </a>
    </section>
  );
}
