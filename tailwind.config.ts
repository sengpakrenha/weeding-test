import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf7f2",
        ivory: "#f7f4ee",
        sand: "#e8e0d5",
        blush: "#fdf6f7",
        gold: {
          DEFAULT: "#f2b83e",
          light: "#f5bc43",
          dark: "#d4a037",
        },
        ink: "#2c2a26",
        muted: "#6b6560",
        memora: {
          primary: "#f2b83e",
          secondary: "#f5bc43",
          accent: "#d4a037",
          bg: "#fdf6f7",
          text: "#d9af56",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["Celinda", "Georgia", "serif"],
        serif: ["Celinda", "Georgia", "serif"],
        celinda: ["Celinda", "Georgia", "serif"],
        khang: ["KhAngTaPenh", "Noto Sans Khmer", "sans-serif"],
      },
      boxShadow: {
        luxe: "0 24px 48px -12px rgba(44, 42, 38, 0.12), 0 12px 24px -8px rgba(44, 42, 38, 0.08)",
        card: "0 4px 24px rgba(44, 42, 38, 0.06)",
        glow: "0 8px 32px -4px rgba(242, 184, 62, 0.45)",
        "glow-sm": "0 4px 20px -2px rgba(242, 184, 62, 0.35)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
