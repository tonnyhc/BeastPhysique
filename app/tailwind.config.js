/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
    fontFamily: {
      acme: ["Acme", "sans-serif", "system-ui"],
    },
    colors: {
      'white': '#FFF',
      'darkBg': "#171A1FFF",
      'helperText': "#6E7787FF",
      'grayText': "#BCC1CAFF",

      'blueText': "#00BDD6FF",
      "light-primaryText": "#171A1FFF",
      "light-secondaryText": "#9095A0FF",
      'light-submitBtn': "#00BDD6FF",

      'googleIcon': "#EA4335FF",
      'fbIcon': '#1877F2FF',
      "appleIcon": "#000000FF"
    },
  },
  plugins: [],
};
