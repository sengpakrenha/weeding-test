"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  return (
    <>
      <MusicPlayer shouldPlay={invitationActive} />

      <AnimatePresence mode="wait">
        {coverVisible ? (
          <CoverPage key="cover" onOpen={() => setCoverVisible(false)} />
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          opacity: invitationActive ? 1 : 0,
          pointerEvents: invitationActive ? "auto" : "none",
        }}
        transition={{
          duration: 1.05,
          ease: [0.16, 1, 0.3, 1],
        }}
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
