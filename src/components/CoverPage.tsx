"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EASE } from "@/lib/motion";
import { memoraUrls } from "@/lib/memora-assets";
import { siteConfig } from "@/lib/site-config";

type CoverPageProps = {
  onOpen: () => void;
};

export function CoverPage({ onOpen }: CoverPageProps) {
  const reduce = useReducedMotion();
  const { couple, weddingDateDisplay, hero, cover } = siteConfig;

  const useMemora = cover.useMemoraAssets;

  const backgroundSrc = useMemora
    ? memoraUrls.coverBackground
    : (cover.backgroundImage ?? hero.backgroundImage);

  const exitDuration = reduce ? 0.2 : 0.85;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: reduce ? "blur(0px)" : "blur(10px)",
      }}
      transition={{
        duration: exitDuration,
        ease: EASE,
      }}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark gradient top → bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#1a0f0a]/65 to-black/85"
          aria-hidden
        />
        {/* Warm gold wash */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[var(--memora-primary)]/12 via-transparent to-[var(--memora-secondary)]/8"
          aria-hidden
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]"
          aria-hidden
        />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-[min(94vw,820px)] flex-col items-center justify-center px-[clamp(0.75rem,3.5vw,1.5rem)] pb-[clamp(6vh,10vw,10vh)] pt-[calc(env(safe-area-inset-top,0px)+clamp(0.5svh,3.5dvh,5lvh))] text-center"
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.95, ease: EASE }}
      >
        {useMemora ? (
          <motion.div
            className="flex w-full flex-col items-center"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.08, ease: EASE }}
          >
            <div className="relative mx-auto w-[min(68vw,300px)] sm:w-[min(58vw,340px)]">
              <Image
                src={memoraUrls.coverMonogram}
                alt=""
                width={310}
                height={310}
                className="mx-auto h-auto w-full max-h-[min(40vh,280px)] object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                priority
              />
            </div>
            <div className="relative -mt-[clamp(0.5rem,3vw,1.25rem)] w-[min(80vw,380px)] sm:w-[min(66vw,300px)]">
              <Image
                src={memoraUrls.coverHeading}
                alt=""
                width={400}
                height={120}
                className="mx-auto h-auto w-full object-contain"
                priority
              />
            </div>
          </motion.div>
        ) : null}

        <motion.p
          className={`mt-[clamp(0.75vh,3vw,1.5vh)] text-[var(--memora-eyebrow)] leading-[1.12] ${
            useMemora ? "font-khang text-[var(--memora-text-gold)]" : "font-script text-[var(--memora-text-gold)]"
          }`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: reduce ? 0 : 0.14, ease: EASE }}
        >
          {couple.invitationLine}
        </motion.p>

        <motion.h1
          className="font-heading mt-5 text-4xl font-medium tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.22, ease: EASE }}
        >
          <span className="block sm:inline">{couple.partner1}</span>
          <span className="mx-2 font-script text-3xl text-[var(--memora-primary)] sm:mx-4 sm:text-4xl md:text-5xl">
            &
          </span>
          <span className="block sm:inline">{couple.partner2}</span>
        </motion.h1>

        {useMemora ? (
          <motion.div
            className="relative mx-auto mt-6 w-[min(70vw,280px)] sm:mt-8"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.36, ease: EASE }}
          >
            <Image
              src={memoraUrls.divider}
              alt=""
              width={400}
              height={40}
              className="h-auto w-full object-contain opacity-90"
            />
          </motion.div>
        ) : (
          <motion.div
            className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-[var(--memora-primary)]/80 to-transparent"
            initial={reduce ? false : { opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.36, ease: EASE }}
          />
        )}

        <motion.p
          className="memora-date-line mt-6 text-white/92"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.46, ease: EASE }}
        >
          {weddingDateDisplay}
        </motion.p>

        <motion.div
          className="mt-[clamp(8vh,11vw,14vh)]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.55, ease: EASE }}
        >
          {useMemora ? (
            <button
              type="button"
              onClick={onOpen}
              aria-label="Open invitation and enter the wedding website"
              className="mx-auto block transition duration-500 ease-cinematic hover:scale-[1.03]"
            >
              <img
                src="/images/border-button.png"
                alt="Open Invitation"
                className="h-auto w-[min(72vw,300px)] sm:w-[260px]"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpen}
              className="group relative inline-flex min-h-[54px] min-w-[240px] items-center justify-center overflow-hidden rounded-sm bg-gradient-to-b from-[#fceaa3] via-[#f2b83e] to-[#c9952e] px-12 py-3.5 font-heading text-xs uppercase tracking-[0.38em] text-ink shadow-glow-sm ring-1 ring-white/25 transition duration-500 ease-cinematic hover:scale-[1.03] hover:shadow-glow"
              aria-label="Open invitation and enter the wedding website"
            >
              <span
                className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/25 opacity-0 transition group-hover:opacity-100"
                aria-hidden
              />
              <span className="relative z-10"></span>
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
