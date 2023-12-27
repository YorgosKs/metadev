/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'very-dark-blue': '#001F3F',
        cyan: '#39CCCC',
        'des-blue': '#2c3e50',
        'lime-green': '#01FF70',
        'gray-blue': '#BDC3C7',
        'gray-cyan': '#ECF0F1',
      },
    },
  },
  plugins: [],
};
