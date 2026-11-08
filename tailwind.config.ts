import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#7A1426", 50: "#FBF0F1", 100: "#F4D9DD", 600: "#8E1B2E", 700: "#7A1426", 800: "#5C0E1C", 900: "#3A0812", 950: "#240509" },
        gold: { DEFAULT: "#C99A3E", 50: "#FBF5E8", 100: "#F3E4C0", 300: "#E6C677", 400: "#D8AE55", 500: "#C99A3E", 600: "#A87C2B", 700: "#7D5B1F" },
        marigold: "#F09A2A",
        ivory: "#FBF7F0",
        ink: "#17100E",
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', "system-ui", "sans-serif"],
        display: ['"Inter Tight Variable"', "system-ui", "sans-serif"],
        condensed: ["Anton", "Impact", "sans-serif"],
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
        telugu: ['"Noto Sans Telugu"', "sans-serif"],
      },
      letterSpacing: { kicker: "0.22em" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        up: { from: { transform: "translateY(0)" }, to: { transform: "translateY(-50%)" } },
        down: { from: { transform: "translateY(-50%)" }, to: { transform: "translateY(0)" } },
        kenburns: { "0%": { transform: "scale(1.04) translate(0,0)" }, "100%": { transform: "scale(1.16) translate(-1.5%,-1%)" } },
        sway: { "0%,100%": { transform: "rotate(-1.4deg)" }, "50%": { transform: "rotate(1.4deg)" } },
        twinkle: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".45" } },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        up: "up 40s linear infinite",
        down: "down 40s linear infinite",
        kenburns: "kenburns 9s ease-out forwards",
        sway: "sway 5s ease-in-out infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
