/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#535BF2",
        primary_light: "#E3E5FF",
        dark: "#131515",
        dark_light: "#13151533",
        neutral_white: "#FFFFFF",
        neutral_gray: "#FAFAFA",
        deep_blue: "#3F3D56",
        danger: "#FF6584",
        danger_light: "#FF658433",
        success: "#58D865",
        success_light: "#58D86533",
        warning: "#FFAB12",
        warning_light: "#FFAB1233",
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
