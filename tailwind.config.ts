module.exports = {
  content: [
    "./admin/pages/**/*.{js,ts,jsx,tsx}",
    "./admin/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
