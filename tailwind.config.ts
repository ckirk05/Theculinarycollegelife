import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        butter: {
          50: '#fffef5',
          100: '#fffce6',
          200: '#fff9cc',
          300: '#fff3a3',
          400: '#ffe970',
          500: '#ffd54f',
          600: '#ffc107',
          700: '#f9a825',
          800: '#f57f17',
          900: '#e65100',
        },
        background: '#fffef9',
        foreground: '#2c2416',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'butter': '0 4px 6px -1px rgba(255, 233, 112, 0.1), 0 2px 4px -1px rgba(255, 233, 112, 0.06)',
      },
    },
  },
  plugins: [],
}
export default config
