import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(breadcrumbs|table|checkbox|form|spacer).js",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue": "#0B3D91"
      },
      fontFamily: {
        merriweather: "var(--font-merriweather), serif",
      },
    },
    screens: {
  		sm: '375px',
  		md: '768px',
  		lg: '1440px',
  	}
  },
  plugins: [heroui()],
} satisfies Config;
