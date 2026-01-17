/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        village: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          dark: '#1f2937',
          light: '#f3f4f6',
        },
        wellbeing: {
          good: '#10b981',
          moderate: '#f59e0b',
          concern: '#f97316',
          critical: '#ef4444',
        }
      },
    },
  },
  plugins: [],
}
