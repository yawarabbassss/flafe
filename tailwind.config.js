/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F37021', // Flafe Orange
          secondary: '#FDB813', // Flafe Yellow
          accent: '#E31837', // Chef's scarf Red
          background: '#FFFDF9', // Warm off-white
          surface: '#FFFFFF', // White
          text: '#2C2A29', // Dark grey/black for text
          muted: '#807E7C', // Muted text
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
