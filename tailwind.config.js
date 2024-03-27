/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'selector',
  theme: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        53: 'repeat(53, minmax(0, 1fr))',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
};
