module.exports = {
  content: [
    './source/_includes/*.html',
    './source/_layouts/*.html',
    './source/_posts/*.md',
    './source/_posts/*.markdown',
    './source/**/*.md',
    './source/**/*.markdown',
    './source/*.md',
    './source/*.html',
  ],
  screens: {
    xs: "320px",
    md: "720px",
    lg: "1024px",
    xl: "1512px",
  },
  theme: {
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
      display: ["Urbanist", "sans-serif"],
      body: ["Urbanist", "sans-serif"],
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "blue-primary": "#ECF8FE",
      "blue-secondary": "#5BE2FF",
      "blue-third": "#0F0452",
      "blue-fourth": "#0267FF",
      "blue-btn": "#02B0FF",
      "blue-light": "#00AEF8",
      "blue-text": "#160967",
      "grey-primary": "#F9F9F9",
      "grey-secondary": "#EDEDED",
      "grey-third": "#abb4b9",
      "grey-text": "#575757",
      "green-primary": "#ECFEFA",
      "green-secondary": "#41F5CA",
      "green-third": "#697671",
      black: "#000000",
      "black-primary": "#001C29",
      "black-secondary": "#222222",
      "black-text": "#101010",
      "brand-primary": "#41BDF5",
      "brand-secondary": "#FFD702",
      "brand-secondary-hover": "#FFD70261",
      white: "#fff",
      "border-line": "rgba(0, 0, 0, 0.1)",
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "90%",
          // "@screen md": {
          //   maxWidth: "600px",
          // },
          "@screen lg": {
            maxWidth: "900px",
          },
          "@screen xl": {
            maxWidth: "1012px",
          },
        },
      });
    },
  ],
}