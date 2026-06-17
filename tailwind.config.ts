import type { Config } from "tailwindcss";

/**
 * Neutral surface/ink colors are driven by CSS variables (see globals.css)
 * so the whole UI can flip between the warm "daylight" palette and a cozy
 * "after dark" night palette by toggling the `dark` class on <html>.
 * Warm accents (amber / peach) stay constant — they glow in both themes.
 */
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm sunrise palette (themeable neutrals)
        cream: withVar("--c-cream"),
        "warm-white": withVar("--c-warm-white"),
        beige: withVar("--c-beige"),
        sand: withVar("--c-sand"),
        // Panel surface that was previously hard-coded white.
        surface: withVar("--c-surface"),
        charcoal: withVar("--c-charcoal"),
        "charcoal-soft": withVar("--c-charcoal-soft"),
        "soft-brown": withVar("--c-soft-brown"),
        // Constant warm accents
        amber: {
          DEFAULT: "#E89B5C",
          soft: "#F0B27D",
          deep: "#C9763B",
        },
        peach: "#F6C9A8",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(149, 108, 67, 0.18)",
        "soft-lg": "0 24px 70px -20px rgba(149, 108, 67, 0.28)",
        glow: "0 0 80px -10px rgba(232, 155, 92, 0.55)",
      },
      backgroundImage: {
        "sunrise":
          "linear-gradient(135deg, #FEFBF6 0%, #F6C9A8 55%, #E89B5C 100%)",
        "warm-fade":
          "linear-gradient(180deg, rgb(var(--c-cream)) 0%, rgb(var(--c-warm-white)) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "soft-pulse": "soft-pulse 4s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
