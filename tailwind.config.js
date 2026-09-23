/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        organizze: {
          bg: '#f4f6f9',
          card: '#ffffff',
          sidebar: '#ffffff',
          primary: '#10b981', // Verde Organizze oficial
          primaryHover: '#059669',
          secondary: '#3b82f6',
          danger: '#ef4444',
          dangerLight: '#fef2f2',
          success: '#10b981',
          successLight: '#ecfdf5',
          border: '#e5e7eb',
          textMain: '#1f2937',
          textMuted: '#6b7280',
          textSub: '#9ca3af',
        }
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
