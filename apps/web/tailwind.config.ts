import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D1B2A",
        surf: "#E0E1DD",
        signal: "#415A77",
        accent: "#D96C06"
      }
    }
  },
  plugins: []
};

export default config;
