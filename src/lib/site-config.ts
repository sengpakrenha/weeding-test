/**
 * Customize your wedding site here — names, date, copy, and image URLs.
 * Hero & gallery images use Unsplash by default; replace with your own URLs or files in /public.
 */
export const siteConfig = {
  couple: {
    partner1: "ប្រឹម ភក្ដី",
    partner2: "ស្រីនិច",
    /** Shown under names, e.g. "Together with their families" */
    invitationLine: "កម្មវិធីមង្គលអាពាហ៍ពិពាហ៍",
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
    src: "https://github.com/sengpakrenha/weeding-test/releases/download/v1.0/videoplayback.mp3",
  },

  hero: {
    /** Full-bleed background — swap for /your-photo.jpg in public/ */
    backgroundImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    subtitle: "សូមគោរពអញ្ជើញ\nសម្ដេច ទ្រង់ ឯកឧត្ដម លោកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និង ប្រិយមិត្ត អញ្ជើញចូលរួម ជាអធិបតី និង ជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរិសួស្ដី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-ស្រី របស់យើងខ្ញុំ។",
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
    useMemoraAssets: false,
    /** Used when useMemoraAssets is false */
    images: [
      "https://69c906cda9fb0ef7c01361fe.imgix.net/photo-1.jpg?w=1280&h=853",
      "https://69c906cda9fb0ef7c01361fe.imgix.net/photo-2.jpg",
      "https://69c906cda9fb0ef7c01361fe.imgix.net/photo-3.jpg",
      "https://69c906cda9fb0ef7c01361fe.imgix.net/photo-4.jpg",
      "https://69c906cda9fb0ef7c01361fe.imgix.net/photo-6.jpg",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
    ],
  },

  countdown: {
    title: "Until we say I do",
  },

  rsvp: {
    enabled: false,
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
