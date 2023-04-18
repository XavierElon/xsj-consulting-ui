/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        gridTemplateColumns: {
          sidebar: '300px auto', //for sidebar layout
        },
        gridTemplateRows: {
          header: '64px auto', //for the navbar layout
        },
        fontFamily: {
          sans: ['Inter var', ...fontFamily.sans],
        },
        backgroundImage: {
          'signup-cover': "url('/images/signup-cover.png')",
        },
        colors: {
          primary: '#000000',
          secondary: '#6AA7F8',
          blue: 'rgb(106,167,248)',
        },
        blue: {
          50: '#02326B',
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
}
