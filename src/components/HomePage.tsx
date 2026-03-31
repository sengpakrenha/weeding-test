"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";
import { Countdown } from "@/components/Countdown";
import { CoverPage } from "@/components/CoverPage";
import { EventDetails } from "@/components/EventDetails";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MusicPlayer } from "@/components/MusicPlayer";
import { OurStory } from "@/components/OurStory";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RSVP } from "@/components/RSVP";
import { SiteNav } from "@/components/SiteNav";
import { WishMessages } from "@/components/WishMessages";

export function HomePage() {
  const [coverVisible, setCoverVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (coverVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [coverVisible]);

  const invitationActive = !coverVisible;

  // iOS requires audio.play() to be called directly inside a user tap handler
  function handleOpen() {
    if (siteConfig.music.enabled && audioRef.current) {
      audioRef.current.muted = true;
      void audioRef.current.play().catch(() => {});
    }
    setCoverVisible(false);
  }

  return (
    <>
      <MusicPlayer shouldPlay={invitationActive} audioRef={audioRef} />
      <AnimatePresence mode="wait">
        {coverVisible ? (
          <CoverPage key="cover" onOpen={handleOpen} />
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          opacity: invitationActive ? 1 : 0,
          pointerEvents: invitationActive ? "auto" : "none",
        }}
        transition={{ duration: 1, ease: EASE }}
        className="min-h-screen"
        aria-hidden={coverVisible}
      >
        <SiteNav visible={invitationActive} />
        <main>
          <Hero />
          <OurStory />
          <EventDetails />
          <PhotoGallery />
          <Countdown />
          <WishMessages />
          <RSVP />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}