/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      backgroundImage: {
        'signup-cover': "url('/images/signup-cover.png')"
      },
      colors: {
        'primary': '#6AA7F8',
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  }
};