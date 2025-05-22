/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        beztern: {
          dark: '#000000',
          light: '#FFFFFF',
          accent: '#333333',
          secondary: '#666666',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          muted: '#6B7280',
        },
      },
      boxShadow: {
        glow: '0 0 25px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}