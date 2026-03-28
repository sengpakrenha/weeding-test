import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function OurStory() {
  const { story } = siteConfig;

  return (
    <section id="story" className="border-t border-gold/10 bg-ivory section-y">
      <div className="content-narrow text-center">
        <FadeIn>
          <p className="memora-eyebrow text-gold">Chapter by chapter</p>
          <h2 className="memora-section-title mt-3 text-ink">{story.title}</h2>
          <p className="memora-section-lead mx-auto mt-7 max-w-xl">{story.intro}</p>
        </FadeIn>
      </div>

      <div className="content-wide mt-16 space-y-20 md:mt-20 md:space-y-24">
        {story.milestones.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.05}>
            <article
              className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-14 ${
                index % 2 === 1
                  ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
                  : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-luxe ring-1 ring-black/[0.04]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="font-script text-xl text-gold md:text-2xl">{item.date}</p>
                <h3 className="font-heading mt-2.5 text-2xl font-medium tracking-tight text-ink md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-5 text-[0.9375rem] leading-[1.82] text-muted md:text-base md:leading-[1.85]">
                  {item.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
