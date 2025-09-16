/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', 
      },
    },
  },
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", 
  ],
};
