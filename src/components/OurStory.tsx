import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function OurStory() {
  const { story } = siteConfig;

  return (
    <section id="story" className="section-y bg-ivory">
      <div className="content-narrow text-center">
        <FadeIn>
          <p className="font-script text-3xl text-gold md:text-4xl lg:text-[2.75rem]">Chapter by chapter</p>
          <h2 className="mt-5 font-serif text-3xl font-normal text-ink md:text-4xl lg:text-[2.75rem]">
            {story.title}
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-[1.85] text-muted md:text-lg">
            {story.intro}
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto mt-20 max-w-5xl space-y-24 px-6 sm:px-8 md:mt-28 md:space-y-32">
        {story.milestones.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.05}>
            <article
              className={`grid gap-12 md:grid-cols-2 md:items-center md:gap-16 ${
                index % 2 === 1
                  ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
                  : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-luxe">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="font-script text-2xl text-gold md:text-3xl">{item.date}</p>
                <h3 className="mt-3 font-serif text-2xl font-normal text-ink md:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-6 text-base leading-[1.85] text-muted md:text-lg">{item.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
