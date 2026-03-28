import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function OurStory() {
  const { story } = siteConfig;

  return (
    <section id="story" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <p className="font-script text-3xl text-gold md:text-4xl">Chapter by chapter</p>
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
            {story.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted leading-relaxed">{story.intro}</p>
        </FadeIn>
      </div>

      <div className="mx-auto mt-16 max-w-5xl space-y-20 px-6 md:mt-24 md:space-y-28">
        {story.milestones.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.05}>
            <article
              className={`grid gap-10 md:grid-cols-2 md:items-center md:gap-14 ${
                index % 2 === 1
                  ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
                  : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg shadow-ink/5">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="font-script text-2xl text-gold">{item.date}</p>
                <h3 className="mt-2 font-serif text-2xl font-light text-ink md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-muted leading-relaxed">{item.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
