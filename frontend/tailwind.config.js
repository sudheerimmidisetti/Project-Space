/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#12002f",
          muted: "#5c58d6",
          light: "#4cc3ff",
          pale: "#ff8df2",
          royal: "#3510a1",
          violet: "#8f2dff",
          orchid: "#ff57dc",
          graphite: "#2f2453",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
