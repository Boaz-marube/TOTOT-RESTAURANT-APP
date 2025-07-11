/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBrown: "#8C3D24",
        "ethiopian-red": "#8c3a24",
        "ethiopian-dark": "#26100A",
        menu: "#FFF1C6",
        "menu-title": "#4A3A0C",
        "contact-bg": "#93532A",
        "dish-des": "#4A3A0C",
        "dish-color": "#8B4513",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
