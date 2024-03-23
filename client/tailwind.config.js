/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '600px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '2560px',
      },
      fontFamily: {
        'open-regular': ['Open Sans Regular', 'sans-serif'],
        'open-light': ['Open Sans Light', 'sans-serif'],
        'open-bold': ['Open Sans Bold'],
        'open-medium': ['Open Sans Medium'],
        'open-semi-bold': ['Open Sans SemiBold'],
      },
      colors: {
        'very-dark-blue': '#001F3F',
        cyan: '#39CCCC',
        'dark-cyan': '#2CA5AC',
        'des-blue': '#2c3e50',
        'lime-green': '#01FF70',
        'gray-blue': '#BDC3C7',
        'gray-cyan': '#ECF0F1',
        'light-gray': '#D3D3D3',
        'dark-gray': '#434343',
        'white-smoke': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
