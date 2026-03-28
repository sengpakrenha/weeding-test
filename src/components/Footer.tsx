import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { couple, footer } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink py-14 text-cream/88 md:py-16">
      <div className="mx-auto max-w-md px-6 text-center sm:px-8">
        <p className="memora-eyebrow text-[clamp(1.5rem,3vw,1.875rem)] text-[var(--memora-text-gold)]">
          {footer.message}
        </p>
        <p className="font-heading mt-4 text-base font-medium tracking-tight text-cream md:text-lg">
          {couple.partner1}
          {footer.showHeart ? (
            <span className="mx-1.5 inline-block text-[var(--memora-primary)] md:mx-2" aria-hidden>
              ♥
            </span>
          ) : (
            " & "
          )}
          {couple.partner2}
        </p>
        <p className="mt-8 text-[10px] uppercase tracking-[0.32em] text-cream/38">© {year}</p>
      </div>
    </footer>
  );
}
