module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cabin']
      },
      backgroundImage: {
        confetti: "url('/src/img/confetti.gif')",
        // kanye: "url('/src/img/kanye.png')",
        // beans:"url('/src/img/beans.jpeg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
