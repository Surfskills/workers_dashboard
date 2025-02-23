import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // White background
        foreground: "var(--foreground)", // Dark text
        primary: "#f0f0f0", // Light grey for elements
        secondary: "#1f1f1f", // Dark grey for elements
      },
    },
  },
  plugins: [],
} satisfies Config;