/**
 * Customize your wedding site here — names, date, copy, and image URLs.
 * Hero & gallery images use Unsplash by default; replace with your own URLs or files in /public.
 */
export const siteConfig = {
  couple: {
    partner1: "Emma",
    partner2: "James",
    /** Shown under names, e.g. "Together with their families" */
    invitationLine: "Together with their families",
  },

  /** ISO 8601 — used for countdown and display formatting */
  weddingDateISO: "2026-09-12T15:00:00",

  /** Long-form date for hero / cards */
  weddingDateDisplay: "Saturday, September 12, 2026",

  /** Fullscreen cover before the site */
  cover: {
    /** Your own image URL, or `null` when using Memora assets / hero */
    backgroundImage: null,
    /**
     * When true, uses Memora demo cover art (background.webp, monogram, heading strip).
     * Set false and provide `backgroundImage` or rely on `hero.backgroundImage` only.
     */
    useMemoraAssets: true,
  },

  /**
   * Background music after "Open Invitation". Replace `src` with your MP3 in /public.
   * Demo URL works for development; host your own file for production.
   */
  music: {
    enabled: true,
    /** Use Memora demo speaker icon in the floating control */
    useMemoraIcon: true,
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },

  hero: {
    /** Full-bleed background — swap for /your-photo.jpg in public/ */
    backgroundImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    subtitle: "Invite you to celebrate their wedding",
  },

  story: {
    title: "Our Story",
    intro:
      "Every love story is beautiful — ours is our favorite. Here is a glimpse of the journey that brought us here.",
    milestones: [
      {
        date: "Spring 2019",
        title: "First meeting",
        description:
          "We crossed paths at a mutual friend’s gathering. Coffee turned into hours of conversation.",
        image:
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      },
      {
        date: "Winter 2021",
        title: "The adventure",
        description:
          "Road trips, quiet Sundays, and big dreams — we knew we were building something lasting.",
        image:
          "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
      },
      {
        date: "Autumn 2024",
        title: "The question",
        description:
          "Under golden leaves, with hearts full — we said yes to forever.",
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      },
    ],
  },

  events: {
    title: "Event Details",
    items: [
      {
        name: "Ceremony",
        when: "Saturday, September 12, 2026",
        time: "3:00 PM",
        venue: "Rosewood Chapel",
        address: "128 Garden Lane, Willow Creek",
        note: "Please arrive 15 minutes early.",
      },
      {
        name: "Reception",
        when: "Saturday, September 12, 2026",
        time: "5:30 PM – late",
        venue: "The Grand Terrace",
        address: "45 Riverside Drive, Willow Creek",
        note: "Dinner, dancing, and toasts to follow.",
      },
    ],
  },

  gallery: {
    title: "Moments",
    /**
     * When true, uses Memora demo gallery (portrait-main + landscape / portrait mix).
     * When false, uses `images` below (square grid).
     */
    useMemoraAssets: true,
    /** Used when useMemoraAssets is false */
    images: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80",
      "https://images.unsplash.com/photo-1522413452209-699e1a075087?w=800&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
    ],
  },

  countdown: {
    title: "Until we say I do",
  },

  rsvp: {
    enabled: true,
    title: "Kindly RSVP",
    subtitle:
      "We would love to know if you can celebrate with us. This form is for your convenience only — no data is sent to a server.",
  },

  wishes: {
    enabled: true,
    title: "Warm wishes",
    subtitle:
      "Leave a note for us — it appears here as soon as you send it. (Messages are kept in memory on the server until it restarts.)",
  },

  footer: {
    message: "With love,",
    showHeart: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
