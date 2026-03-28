"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EASE } from "@/lib/motion";
import type { MemoraGalleryItem } from "@/lib/memora-assets";
import { memoraGalleryItems } from "@/lib/memora-assets";
import { siteConfig } from "@/lib/site-config";
import { FadeIn } from "./FadeIn";

type FlatPhoto = { src: string; variant: MemoraGalleryItem["variant"] | "square" };

function aspectClass(variant: FlatPhoto["variant"]) {
  switch (variant) {
    case "featured":
      return "aspect-[3/4] min-h-[220px] sm:min-h-[280px] md:aspect-[4/5] md:min-h-[300px]";
    case "landscape":
      return "aspect-[4/3]";
    case "portrait":
      return "aspect-[3/4]";
    default:
      return "aspect-square";
  }
}

export function PhotoGallery() {
  const { gallery } = siteConfig;

  const photos: FlatPhoto[] = useMemo(() => {
    if (gallery.useMemoraAssets) {
      return memoraGalleryItems.map((item) => ({
        src: item.src,
        variant: item.variant,
      }));
    }
    return gallery.images.map((src) => ({ src, variant: "square" as const }));
  }, [gallery]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const showPrev = useCallback(() => {
    setOpenIndex((i) => {
      const len = photos.length;
      if (i === null || len === 0) return null;
      return (i - 1 + len) % len;
    });
  }, [photos]);

  const showNext = useCallback(() => {
    setOpenIndex((i) => {
      const len = photos.length;
      if (i === null || len === 0) return null;
      return (i + 1) % len;
    });
  }, [photos]);

  useEffect(() => {
    if (openIndex === null) return;
    const len = photos.length;
    if (len === 0 || openIndex < 0 || openIndex >= len) {
      setOpenIndex(null);
    }
  }, [openIndex, photos]);

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

  const lightboxOpen =
    openIndex !== null &&
    photos.length > 0 &&
    openIndex >= 0 &&
    openIndex < photos.length;

  const activeSrc: string | undefined = lightboxOpen ? photos[openIndex].src : undefined;

  const isMemora = gallery.useMemoraAssets;

  const tileClass =
    "group relative w-full overflow-hidden rounded-xl bg-sand ring-1 ring-black/[0.04] transition duration-500 ease-cinematic hover:z-[1] hover:scale-[1.05] hover:shadow-luxe focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--memora-primary)] focus-visible:ring-offset-2";

  return (
    <section id="gallery" className="border-t border-gold/10 bg-[var(--memora-bg)] section-y">
      <div className="content-wide">
        <FadeIn className="text-center">
          <p className="memora-eyebrow text-[var(--memora-text-gold)]">Captured memories</p>
          <h2 className="memora-section-title mt-3 text-ink">{gallery.title}</h2>
        </FadeIn>

        {isMemora ? (
          <div className="mt-12 md:mt-14">
            <div className="mb-7 md:hidden">
              <FadeIn delay={0.02}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(0)}
                  className="group relative w-full overflow-hidden rounded-xl bg-sand shadow-card ring-1 ring-black/[0.04] transition duration-500 ease-cinematic hover:scale-[1.02] hover:shadow-luxe"
                >
                  <div className={`relative w-full ${aspectClass("featured")}`}>
                    <Image
                      src={photos[0].src}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover transition duration-700 ease-cinematic group-hover:scale-[1.05]"
                      priority
                    />
                    <span
                      className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/[0.12]"
                      aria-hidden
                    />
                  </div>
                </button>
              </FadeIn>
            </div>

            <div className="columns-2 gap-4 sm:gap-5 md:columns-3 md:gap-5 lg:gap-6">
              {photos.map((photo, index) => (
                <FadeIn
                  key={photo.src}
                  className={`mb-4 break-inside-avoid sm:mb-5 ${index === 0 ? "hidden md:block" : ""}`}
                  delay={Math.min((index % 5) * 0.04, 0.16)}
                >
                  <button type="button" onClick={() => setOpenIndex(index)} className={tileClass} aria-label={`Open photo ${index + 1}`}>
                    <div className={`relative w-full ${aspectClass(photo.variant)}`}>
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition duration-700 ease-cinematic group-hover:scale-[1.06]"
                      />
                      <span
                        className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/[0.12]"
                        aria-hidden
                      />
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3 md:gap-5">
            {photos.map((photo, index) => (
              <FadeIn key={photo.src} delay={(index % 3) * 0.05}>
                <button type="button" onClick={() => setOpenIndex(index)} className={tileClass} aria-label={`Open photo ${index + 1}`}>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition duration-700 ease-cinematic group-hover:scale-[1.06]"
                    />
                    <span
                      className="absolute inset-0 bg-ink/0 transition duration-500 group-hover:bg-ink/[0.12]"
                      aria-hidden
                    />
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && activeSrc !== undefined ? (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={close}
          >
            <motion.button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-[60] rounded-full border border-cream/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-cream/10"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35, ease: EASE }}
            >
              Close
            </motion.button>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-cream/35 p-3.5 text-cream transition hover:bg-cream/10 md:left-6"
              aria-label="Previous photo"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.35, ease: EASE }}
            >
              ‹
            </motion.button>
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-cream/35 p-3.5 text-cream transition hover:bg-cream/10 md:right-6"
              aria-label="Next photo"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.35, ease: EASE }}
            >
              ›
            </motion.button>
            <div
              className="relative h-[min(85vh,92vw)] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Image
                    src={activeSrc}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
