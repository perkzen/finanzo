/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: false,
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
