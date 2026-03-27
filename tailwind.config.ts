import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#CDA328",
          dark: "#8B6800",
          soft: "#E1BE56",
          foreground: "#111111",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F8F5F1",
        },
        text: {
          DEFAULT: "#111111",
          soft: "#4F4A43",
        },
        border: "#DDD4C8",
      },
      fontFamily: {
        display: ['"Lora"', "serif"],
        body: ['"Poppins"', "sans-serif"],
      },
      borderRadius: {
        xs: "10px",
        sm: "14px",
        md: "20px",
        lg: "28px",
        xl: "36px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
