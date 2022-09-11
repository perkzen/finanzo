/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3F4FD',
        secondary: '#ECEDF6',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
