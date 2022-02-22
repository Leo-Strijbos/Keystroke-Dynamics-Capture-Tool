module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        heading: ['Cabin']
      },
      // backgroundImage: {
      //   background: "url('/src/img/background.jpeg')",
      //   kanye: "url('/src/img/kanye.png')",
      //   beans:"url('/src/img/beans.jpeg')"
      // }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
