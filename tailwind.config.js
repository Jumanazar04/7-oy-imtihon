/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homepageimage: 'url("./assets/what-is-a-home-page.jpg")'
      }
    },
  },
  plugins: [],
}