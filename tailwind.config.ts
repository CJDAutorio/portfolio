/** @type {import('tailwindcss').Config} */
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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: {
      'sans': ['var(--font-geist)', 'ui-sans-serif', 'system-ui'],
      'serif': ['var(--font-source-serif-4)', 'ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['var(--font-source-serif-4)'],
      'body': ['var(--font-geist)'],
    }
  },
  important: true,
  plugins: [
    require('tailwind-scrollbar'),
  ],
} satisfies Config;
