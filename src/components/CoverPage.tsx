"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type CoverPageProps = {
  onOpen: () => void;
};

export function CoverPage({ onOpen }: CoverPageProps) {
  const reduce = useReducedMotion();
  const { couple, weddingDateDisplay, hero, cover } = siteConfig;
  const backgroundSrc = cover.backgroundImage ?? hero.backgroundImage;

  const duration = reduce ? 0.2 : 1;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 motion-reduce:scale-100"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/80"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,18,16,0.4)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-8 text-center text-cream">
        <motion.p
          className="mb-6 font-script text-3xl text-gold-light sm:text-4xl md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {couple.invitationLine}
        </motion.p>

        <motion.h1
          className="font-serif text-4xl font-normal tracking-[0.02em] sm:text-5xl md:text-6xl lg:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block sm:inline">{couple.partner1}</span>
          <span className="mx-2 font-script text-gold-light sm:mx-5">&</span>
          <span className="block sm:inline">{couple.partner2}</span>
        </motion.h1>

        <motion.div
          className="mx-auto mt-12 h-px w-32 bg-gradient-to-r from-transparent via-gold/90 to-transparent"
          initial={reduce ? false : { opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.45 }}
        />

        <motion.p
          className="mt-10 font-serif text-lg tracking-[0.28em] text-cream/95 sm:text-xl md:text-2xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.55 }}
        >
          {weddingDateDisplay}
        </motion.p>

        <motion.div
          className="mt-14"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduce ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={onOpen}
            className="group relative inline-flex min-h-[52px] min-w-[220px] items-center justify-center overflow-hidden border border-gold/50 bg-cream/10 px-10 py-3 font-serif text-xs uppercase tracking-[0.35em] text-cream backdrop-blur-sm transition hover:border-gold-light hover:bg-cream/20"
            aria-label="Open invitation and enter the wedding website"
          >
            <span className="relative z-10">Open Invitation</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 transition group-hover:opacity-100"
              aria-hidden
            />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
