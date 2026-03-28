/** Public asset paths on the Memora demo — for matching look & feel. Replace with your own files in /public when ready. */
export const MEMORA_DEMO_BASE = "https://demo-03.memora-shine.shop";

const v = "?v=20251221";

export const memoraUrls = {
  coverBackground: `${MEMORA_DEMO_BASE}/images/cover-page/background.webp${v}`,
  coverMonogram: `${MEMORA_DEMO_BASE}/images/cover-page/monogram.png${v}`,
  coverHeading: `${MEMORA_DEMO_BASE}/images/cover-page/heading-cover-page.png${v}`,
  divider: `${MEMORA_DEMO_BASE}/images/border-styles/divider.png${v}`,
  borderButton: `${MEMORA_DEMO_BASE}/images/border-styles/border-button.png${v}`,
  soundOn: `${MEMORA_DEMO_BASE}/images/svg/sound-on.svg${v}`,
} as const;

const galleryBase = `${MEMORA_DEMO_BASE}/images/home-page/gallery`;

function g(file: string) {
  return `${galleryBase}/${file}${v}`;
}

/** Memora demo gallery — mixed landscape + portrait (same files as demo-03). */
export type MemoraGalleryVariant = "featured" | "landscape" | "portrait";

export type MemoraGalleryItem = {
  src: string;
  variant: MemoraGalleryVariant;
};

/**
 * Order and variants tuned for a masonry column flow (featured first = hero tile).
 */
export const memoraGalleryItems: readonly MemoraGalleryItem[] = [
  { src: g("portrait-main.jpg"), variant: "featured" },
  { src: g("landscape-01.jpg"), variant: "landscape" },
  { src: g("portrait-01.jpg"), variant: "portrait" },
  { src: g("landscape-02.jpg"), variant: "landscape" },
  { src: g("portrait-02.jpg"), variant: "portrait" },
  { src: g("landscape-03.jpg"), variant: "landscape" },
  { src: g("portrait-03.jpg"), variant: "portrait" },
  { src: g("landscape-04.jpg"), variant: "landscape" },
  { src: g("portrait-04.jpg"), variant: "portrait" },
  { src: g("landscape-05.jpg"), variant: "landscape" },
  { src: g("portrait-05.jpg"), variant: "portrait" },
  { src: g("landscape-06.jpg"), variant: "landscape" },
  { src: g("portrait-06.jpg"), variant: "portrait" },
  { src: g("landscape-07.jpg"), variant: "landscape" },
  { src: g("portrait-07.jpg"), variant: "portrait" },
  { src: g("portrait-08.jpg"), variant: "portrait" },
  { src: g("portrait-09.jpg"), variant: "portrait" },
  { src: g("portrait-10.jpg"), variant: "portrait" },
] as const;
