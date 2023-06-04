/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#535BF2",
        secondary: "#FFAB12",
        neutralDark: "#131515",
        danger: "#DA4944",
        success: "#4F772D",
        textfield: "B9BCFF",
      },
      fontFamily: {
        sen: ["Sen", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
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
        smd: "917px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },
      backgroundImage: {
        bg: "url('/src/assets/images/about_bg.png')",
      },
    },
  },
  plugins: [],
};
