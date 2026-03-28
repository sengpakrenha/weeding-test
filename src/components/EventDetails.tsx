import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function EventDetails() {
  const { events } = siteConfig;

  return (
    <section id="events" className="bg-blush py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl">Save the date</p>
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
            {events.title}
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {events.items.map((event, i) => (
            <FadeIn key={event.name} delay={i * 0.08}>
              <div className="h-full border border-gold/25 bg-white/60 p-8 shadow-sm backdrop-blur-sm transition hover:border-gold/40 hover:shadow-md md:p-10">
                <p className="font-script text-2xl text-gold">{event.name}</p>
                <p className="mt-4 font-serif text-lg text-ink">{event.when}</p>
                <p className="mt-2 text-sm uppercase tracking-widest text-muted">{event.time}</p>
                <div className="my-6 h-px w-12 bg-gold/50" />
                <p className="font-serif text-xl text-ink">{event.venue}</p>
                <p className="mt-2 text-muted leading-relaxed">{event.address}</p>
                {event.note ? (
                  <p className="mt-4 text-sm italic text-muted/90">{event.note}</p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
