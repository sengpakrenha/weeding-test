"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

export function PhotoGallery() {
  const { gallery } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || gallery.images.length === 0) return null;
      return (i - 1 + gallery.images.length) % gallery.images.length;
    });
  }, [gallery.images.length]);
  const showNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null || gallery.images.length === 0) return null;
      return (i + 1) % gallery.images.length;
    });
  }, [gallery.images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext]);

  return (
    <section id="gallery" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="text-center">
          <p className="font-script text-3xl text-gold md:text-4xl">Captured memories</p>
          <h2 className="mt-3 font-serif text-3xl font-light text-ink md:text-4xl">
            {gallery.title}
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {gallery.images.map((src, index) => (
            <FadeIn key={index} delay={(index % 3) * 0.05}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group relative aspect-square w-full overflow-hidden rounded-sm bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                aria-label={`Open photo ${index + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/10"
                  aria-hidden
                />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-[60] rounded-full border border-cream/40 px-4 py-2 text-sm uppercase tracking-widest text-cream transition hover:bg-cream/10"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-cream/30 p-3 text-cream transition hover:bg-cream/10 md:left-6"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-cream/30 p-3 text-cream transition hover:bg-cream/10 md:right-6"
            aria-label="Next photo"
          >
            ›
          </button>
          <div
            className="relative h-[min(85vh,90vw)] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery.images[openIndex]}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
