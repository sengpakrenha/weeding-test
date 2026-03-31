"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { memoraUrls } from "@/lib/memora-assets";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "wedding-music-muted";
const TARGET_VOL = 0.3;
const FADE_IN_MS = 1500;
const FADE_TOGGLE_MS = 320;

type MusicPlayerProps = {
  shouldPlay: boolean;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
};

function IconVolumeOn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function IconVolumeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function fadeVolume(
  el: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
  onDone?: () => void
) {
  const start = performance.now();
  function tick(now: number) {
    const t = Math.min(1, (now - start) / durationMs);
    el.volume = Math.max(0, Math.min(1, from + (to - from) * t));
    if (t < 1) {
      requestAnimationFrame(tick);
    } else if (onDone) {
      onDone();
    }
  }
  requestAnimationFrame(tick);
}

export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const { music } = siteConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const reduceMotion = useReducedMotion();
  const entryDoneRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") setMuted(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!shouldPlay) {
      entryDoneRef.current = false;
    }
  }, [shouldPlay]);

  useEffect(() => {
    if (!music.enabled || !shouldPlay || !hydrated) return;
    const el = audioRef.current;
    if (!el || entryDoneRef.current) return;

    entryDoneRef.current = true;
    el.muted = false;
    el.volume = 0;
    void el.play().catch(() => {});

    if (mutedRef.current) {
      el.volume = 0;
      el.muted = true;
      return;
    }

    if (reduceMotion) {
      el.volume = TARGET_VOL;
      return;
    }

    const start = performance.now();
    function step(now: number) {
      if (!el) return;
      const t = Math.min(1, (now - start) / FADE_IN_MS);
      el.volume = TARGET_VOL * t;
      el.muted = false;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldPlay, hydrated, music.enabled, reduceMotion]);

  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    const next = !muted;

    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* ignore */
    }

    if (!el) {
      setMuted(next);
      return;
    }

    if (reduceMotion) {
      el.muted = next;
      el.volume = next ? 0 : TARGET_VOL;
      setMuted(next);
      return;
    }

    if (next) {
      fadeVolume(el, el.volume, 0, FADE_TOGGLE_MS, () => {
        el.muted = true;
        setMuted(true);
      });
    } else {
      el.muted = false;
      fadeVolume(el, el.volume, TARGET_VOL, FADE_TOGGLE_MS, () => {
        setMuted(false);
      });
      void el.play().catch(() => {});
    }
  }, [muted, reduceMotion]);

  if (!music.enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={music.src} loop playsInline preload="auto" className="hidden" />
      {shouldPlay && hydrated ? (
        <motion.button
          type="button"
          onClick={toggleMute}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-white/18 text-ink shadow-luxe backdrop-blur-xl ring-1 ring-black/[0.06] transition-colors hover:bg-white/28 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--memora-primary)] focus-visible:ring-offset-2"
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          title={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? (
            <IconVolumeOff />
          ) : music.useMemoraIcon ? (
            <Image
              src={memoraUrls.soundOn}
              alt=""
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
            />
          ) : (
            <IconVolumeOn />
          )}
        </motion.button>
      ) : null}
    </>
  );
}
