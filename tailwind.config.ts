import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text-light': '#1C1C1E',
        'text-dark': '#F5F5F7',
        'accent-light': '#007AFF',
        'accent-dark': '#0A84FF',
        'secondary-light': '#E5E2DC',
        'secondary-dark': '#191B28',
        'border-light': '#D1D1D1',
        'border-dark': '#4A4A4A',
        background: {
          light: '#F5F5F7',
          dark: '#000000',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'apple': '12px',
        'apple-lg': '20px',
      },
      boxShadow: {
        'apple': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'apple-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config

