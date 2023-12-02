/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: '640',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
  },
  plugins: [],
}

