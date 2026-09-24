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
          'dark-bg': '#0c0c0c',
          'dark-surface': '#141414',
          'light-text': '#e5e5e5',
          'muted-text': '#a3a3a3',
        },
        fontFamily: {
          serif: ['var(--font-playfair)', 'serif'],
          sans: ['var(--font-inter)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  export default config;