"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "wedding-music-muted";

type MusicPlayerProps = {
  /** When true, user has opened the invitation — audio may play */
  shouldPlay: boolean;
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

export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const { music } = siteConfig;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setMuted(true);
    } catch {
      /* ignore */
    }
  }, []);

  const syncAudio = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
    el.volume = 0.35;
  }, [muted]);

  useEffect(() => {
    syncAudio();
  }, [syncAudio, muted]);

  useEffect(() => {
    if (!music.enabled || !shouldPlay || !hydrated) return;
    const el = audioRef.current;
    if (!el) return;
    syncAudio();
    void el.play().catch(() => {
      /* autoplay may be blocked until user interacts */
    });
  }, [shouldPlay, music.enabled, hydrated, syncAudio]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      const el = audioRef.current;
      if (el) {
        el.muted = next;
        if (!next && shouldPlay) {
          void el.play().catch(() => {});
        }
      }
      return next;
    });
  }, [shouldPlay]);

  if (!music.enabled) return null;

  return (
    <>
      <audio ref={audioRef} src={music.src} loop playsInline preload="auto" className="hidden" />
      {shouldPlay && hydrated ? (
        <button
          type="button"
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-cream/95 text-ink shadow-luxe backdrop-blur-md transition hover:border-gold hover:bg-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          title={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? <IconVolumeOff /> : <IconVolumeOn />}
        </button>
      ) : null}
    </>
  );
}
