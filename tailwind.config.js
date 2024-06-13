/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homepageimage: 'url("./assets/home-page-image.jpg")'
      }
    },
  },
  plugins: [],
}