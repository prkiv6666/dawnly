import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm sunrise palette
        cream: "#FBF6EF",
        "warm-white": "#FEFBF6",
        beige: "#EFE3D3",
        sand: "#E7D6C0",
        amber: {
          DEFAULT: "#E89B5C",
          soft: "#F0B27D",
          deep: "#C9763B",
        },
        peach: "#F6C9A8",
        "soft-brown": "#9A6B43",
        charcoal: "#2B2622",
        "charcoal-soft": "#4A423B",
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
        "sunrise": "linear-gradient(135deg, #FEFBF6 0%, #F6C9A8 55%, #E89B5C 100%)",
        "warm-fade": "linear-gradient(180deg, #FBF6EF 0%, #FEFBF6 100%)",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "soft-pulse": "soft-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
