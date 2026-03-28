import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { couple, footer } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-16 text-cream/85">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-script text-2xl text-gold-light md:text-3xl">{footer.message}</p>
        <p className="mt-4 font-serif text-xl text-cream md:text-2xl">
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
        <p className="mt-10 text-xs uppercase tracking-[0.25em] text-cream/50">
          © {year} · Made with love
        </p>
      </div>
    </footer>
  );
}
