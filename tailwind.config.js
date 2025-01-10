module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#25B79B",
          100: "#E4F7F5",
          200: "#BEEDE8",
          600: "#1EA686",
        },
        secondary: "#fef7dd" /* Light gray for background */,
        textPrimary: "#1a202c" /* Default text color */,
      },
    },
  },
  plugins: [],
};
