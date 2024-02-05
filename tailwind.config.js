/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontSize: {
      xs: ["0.655rem", "0.75rem"],
      sm: ["0.75rem", "1rem"],
      base: ["0.875rem", "1.25rem"],
    },
  },
  plugins: [],
};
