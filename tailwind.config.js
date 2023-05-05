/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: 'jit',
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
        epilogue: ['Epilogue', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
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
          primary: '#FFFFFF',
          secondary: '#6AA7F8',
        },
        backgroundColor: {
          myBlue: '#0061EB',
        },
        blue: {
          50: '#02326B',
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus', 'group-hover', 'pulse'],
    },
  },
}
