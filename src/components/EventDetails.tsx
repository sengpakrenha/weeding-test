import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function EventDetails() {
  const { events } = siteConfig;

  return (
    <section id="events" className="section-y bg-blush">
      <div className="content-wide">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl lg:text-[2.75rem]">Save the date</p>
          <h2 className="mt-5 font-serif text-3xl font-normal text-ink md:text-4xl lg:text-[2.75rem]">
            {events.title}
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
          {events.items.map((event, i) => (
            <FadeIn key={event.name} delay={i * 0.08}>
              <div className="group h-full border border-gold/20 bg-white/70 p-10 shadow-card backdrop-blur-sm transition duration-500 ease-cinematic hover:border-gold/40 hover:shadow-luxe md:p-12">
                <p className="font-script text-2xl text-gold md:text-3xl">{event.name}</p>
                <p className="mt-6 font-serif text-lg text-ink md:text-xl">{event.when}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted">{event.time}</p>
                <div className="my-8 h-px w-16 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="font-serif text-xl text-ink md:text-2xl">{event.venue}</p>
                <p className="mt-3 leading-relaxed text-muted">{event.address}</p>
                {event.note ? (
                  <p className="mt-6 text-sm italic leading-relaxed text-muted/95">{event.note}</p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
