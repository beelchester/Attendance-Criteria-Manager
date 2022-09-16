/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors:{
        primary : "#101820FF",
        secondary :"#0d131a",
        accent:"#FEE715FF"
      }
    },
    screens: {
  
      ss: "620px",
      sm: "768px",
      md: "960px",
      lg: "1250px",
      xl: "1700px",
    },
  },
  plugins: [],
};