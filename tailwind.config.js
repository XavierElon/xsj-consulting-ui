/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
       gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
      },
      gridTemplateRows: {
        header: "64px auto", //for the navbar layout
      },
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