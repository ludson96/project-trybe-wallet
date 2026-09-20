/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
        heading: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: '#1b1e24',
          card: '#22262e',
          cardHover: '#282d36',
          border: 'rgba(255, 255, 255, 0.075)',
          borderStrong: 'rgba(255, 255, 255, 0.2)',
          accent: '#47c9e5',
          accentHover: '#5ed0ea',
          heading: '#ffffff',
          text: '#9fa4af',
          muted: '#6a707c',
        }
      },
      letterSpacing: {
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
