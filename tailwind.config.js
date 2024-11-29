/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blue_morty: '#4A90E2',
        purple_portal: '#9B59B6',
        bright_yellow: '#F1C40F',
        light_gray: '#BDC3C7',
        rick_skin: '#F2D2A9',
        morty_skin: '#F1C27D',
        dark_blue_rick: '#1F2A44',
      }
    },
  },
  plugins: [],
};
