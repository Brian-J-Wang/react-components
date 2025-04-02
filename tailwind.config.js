/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
    './src/**/*.js'
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

