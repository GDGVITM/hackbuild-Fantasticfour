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
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'caribbean_current': { DEFAULT: '#006d77', '100': '#001617', '200': '#002b2f', '300': '#004146', '400': '#00565e', '500': '#006d77', '600': '#00b4c4', '700': '#13ebff', '800': '#62f2ff', '900': '#b0f8ff' },
        'tiffany_blue': { DEFAULT: '#83c5be', '100': '#152c2a', '200': '#2a5954', '300': '#3f857e', '400': '#56afa6', '500': '#83c5be', '600': '#9bd0cb', '700': '#b4dcd8', '800': '#cde7e5', '900': '#e6f3f2' },
        'alice_blue': { DEFAULT: '#edf6f9', '100': '#183d49', '200': '#307991', '300': '#5badc8', '400': '#a3d1e0', '500': '#edf6f9', '600': '#f0f7fa', '700': '#f4f9fb', '800': '#f7fbfc', '900': '#fbfdfe' },
        'pale_dogwood': { DEFAULT: '#ffddd2', '100': '#5d1700', '200': '#ba2e00', '300': '#ff5117', '400': '#ff9774', '500': '#ffddd2', '600': '#ffe3da', '700': '#ffeae3', '800': '#fff1ed', '900': '#fff8f6' },
        'atomic_tangerine': { DEFAULT: '#e29578', '100': '#39180c', '200': '#723018', '300': '#ac4824', '400': '#d6673f', '500': '#e29578', '600': '#e8aa93', '700': '#eebfae', '800': '#f4d4c9', '900': '#f9eae4' }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;