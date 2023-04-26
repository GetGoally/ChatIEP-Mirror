/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#000',
      dark: '#253646',
      white: '#fff',
      yellow: '#FFD458',
      light_yellow: '#FFFEDD',
      purple: '#E6DDFF',
      dark_purple: '#762AF1',
      purple_secondary: '#6D3F7D',
      lime: '#DFF678',
      blue: '#0066FF',
      red: '#FF0000',
      grey: '#BDBDBD',
      light_grey: '#F2F2F2',
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
      typography: ({ theme }) => {
        return {
          DEFAULT: {
            css: {
              color: '#000',
              fontSize: '14px',
              lineHeight: '1.28',
              'li::marker': {
                color: '#000',
              },
            },
          },
          invert: {
            css: {
              color: '#fff',
              'li::marker': {
                color: '#fff',
              },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
