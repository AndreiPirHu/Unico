/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontSize: {
      xs: ["0.655rem", "0.75rem"],
      sm: ["0.75rem", "1rem"],
      base: ["0.875rem", "1.25rem"],
      lg: ["1rem", "1.5rem"],
      xl: ["1.125rem", "1.75rem"],
      "2xl": ["1.5rem", "2rem"],
      "3xl": ["1.875rem", "2.25rem"],
      "4xl": ["2rem", "2.5rem"],
      "5xl": ["2.25rem", "2.75rem"],
      "6xl": ["3rem", "1"],
    },
  },
  plugins: [],
};
