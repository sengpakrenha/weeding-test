import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RSVP } from "@/components/RSVP";
import { SiteNav } from "@/components/SiteNav";
import { WishMessages } from "@/components/WishMessages";

export default function Home() {
  return (
    <>
      <SiteNav />
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
    </>
  );
}
