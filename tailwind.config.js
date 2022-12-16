/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.js',
  ],
  theme: {
    screens:{
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        "lightBlue": "#0080b7a8",
        "lightDarkBlue": "#0080b7",
        "darkBlue": "#0041a9",
        "lightOrange": '#ffd26c',
        "pink": '#ffa799'

      }
    },
  },
  plugins: [],
}
