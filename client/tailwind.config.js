/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter, sans-serif",
        { fontFeatureSettings: '"cv02","cv03","cv04","cv11"' },
      ],
    },
  },
  plugins: [],
};
