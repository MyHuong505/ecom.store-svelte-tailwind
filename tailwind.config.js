/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#B68A74",
      },
    },
  },
  plugins: [],
};
