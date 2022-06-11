/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        accent: '#f5f5f5',
      },
    },
  },
  daisyui: {
    themes: false,
    base: false,
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
