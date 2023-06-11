/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inconsolata', 'monospace'],
      serif: ['Inter', 'sans-serif'],
      mono: ['Lora', 'serif'],
    },
    extend: {
      colors: {
        purple: {
          custom: 'rgb(164, 69, 237)',
        },
        gray: {
          100: '#1f1f1f',
          200: '#2d2d2d',
          300: '#3a3a3a',
          400: '#838383',
          500: '#a3a3a3',
          600: '#dddddd',
          700: '#f6f6f6'
        },
        red: {
          melon: 'rgb(255, 82, 82)',
        },
        black: {
          custom: '#050505',
        },
      },
    },
  },
  plugins: [],
};
