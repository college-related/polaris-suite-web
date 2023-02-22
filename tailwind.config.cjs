/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#535BF2 ",
        secondary: "#FFAB12",
        neutralDark: "#131515",
        danger: "#DA4944",
        success: "#4F772D",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      fontSize: {
        h1: "48px",
        h2: "36px",
        h3: "28px",
        h4: "24px",
        h5: "20px",
        h6: "18px",
        body: "18px",
        subtitle: "16px",
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};
