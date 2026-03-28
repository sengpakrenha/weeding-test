import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { couple, footer } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-20 text-cream/88 md:py-24">
      <div className="mx-auto max-w-3xl px-8 text-center">
        <p className="font-script text-2xl text-gold-light md:text-3xl">{footer.message}</p>
        <p className="mt-6 font-serif text-xl text-cream md:text-2xl">
          {couple.partner1}
          {footer.showHeart ? (
            <span className="mx-2 inline-block text-gold-light" aria-hidden>
              ♥
            </span>
          ) : (
            " & "
          )}
          {couple.partner2}
        </p>
        <p className="mt-12 text-[10px] uppercase tracking-[0.28em] text-cream/45">
          © {year} · Made with love
        </p>
      </div>
    </footer>
  );
}
