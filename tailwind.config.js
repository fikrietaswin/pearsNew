/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f8fafc',
          100: '#1e293b',
          200: '#1a1f2e',
          300: '#0f172a',
          400: '#0d1424',
          500: '#0b101d',
        },
        accent: {
          primary: '#ef4444',
          secondary: '#f97316',
        }
      }
    },
  },
  plugins: [],
}