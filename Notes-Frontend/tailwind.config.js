/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
      colors: {
      'gkeep-text': 'rgb(232, 234, 237)',
    },
  },
},

  plugins: [],
};
