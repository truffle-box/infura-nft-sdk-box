/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleDark: "#935DD7",
        purpleLight: "rgba(195, 169, 249, 0.5)",
        purpleTransparent: "rgba(36,41,46,0.3)"
      }
    },
  },
  plugins: [],
}
