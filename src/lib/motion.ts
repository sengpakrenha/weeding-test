/** Shared cinematic easing — use across Framer Motion & CSS */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const FADE_IN_VIEW = {
  duration: 0.75,
  ease: EASE,
} as const;
