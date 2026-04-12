/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gold: {
            DEFAULT: '#C8A96A',
            light: '#D4BA82',
            dark: '#B8955A',
          },
          dark: {
            950: '#050505',
            900: '#080808',
            850: '#0a0a0a',
            800: '#0d0d0d',
            750: '#0f0f0f',
            700: '#141414',
            600: '#1a1a1a',
          },
          whatsapp: '#25D366',
        },
        fontFamily: {
          display: ['"Playfair Display"', 'serif'],
          body: ['"Outfit"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
