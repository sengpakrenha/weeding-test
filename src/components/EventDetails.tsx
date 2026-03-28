import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function EventDetails() {
  const { events } = siteConfig;

  return (
    <section id="events" className="border-t border-gold/10 bg-blush section-y">
      <div className="content-wide">
        <FadeIn className="text-center">
          <p className="memora-eyebrow text-gold">Save the date</p>
          <h2 className="memora-section-title mt-3 text-ink">{events.title}</h2>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {events.items.map((event, i) => (
            <FadeIn key={event.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-gold/14 bg-white/78 p-8 shadow-card backdrop-blur-[2px] transition duration-500 ease-cinematic hover:border-gold/32 hover:shadow-luxe md:p-10">
                <p className="font-script text-xl text-gold md:text-2xl">{event.name}</p>
                <div className="mt-5 flex items-center gap-3 text-ink">
                  <span className="inline-block h-px w-7 bg-gradient-to-r from-gold/75 to-transparent" aria-hidden />
                  <p className="font-heading text-base font-medium md:text-lg">{event.when}</p>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-muted">{event.time}</p>
                <div className="my-7 h-px w-full bg-gradient-to-r from-gold/22 via-gold/10 to-transparent" />
                <p className="font-heading text-lg font-medium text-ink md:text-xl">{event.venue}</p>
                <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-muted md:text-base">{event.address}</p>
                {event.note ? (
                  <p className="mt-5 border-t border-gold/10 pt-5 text-sm italic leading-relaxed text-muted/95">
                    {event.note}
                  </p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
