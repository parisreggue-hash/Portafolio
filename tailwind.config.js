/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#00d4aa',
        'accent-2': '#7c3aed',
        dark: '#080808',
        'dark-2': '#111111',
        'dark-3': '#1a1a1a',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
