module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'car_green': "url('./assets/img/car-green.svg')",
      },
      colors: {
        primary: '#28a745', /* Consistent green for primary actions */
        secondary: '#f5f5f5', /* Light gray for background */
        textPrimary: '#1a202c', /* Default text color */
      },
    },
  },
  plugins: [],
}
