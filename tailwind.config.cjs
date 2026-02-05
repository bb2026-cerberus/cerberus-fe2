/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 10px 24px rgba(0,0,0,0.08)",
        fab: "0 12px 24px rgba(0,0,0,0.18)",
      },
      colors: {
        ink: {
          900: "#0B0F19",
          700: "#1F2937",
          600: "#4B5563",
          500: "#6B7280",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
          50: "#FAFAFB",
        },
        brand: {
          600: "#0B4CA2",
          500: "#0E5BD1",
          50: "#E8F1FF",
        },
      },
    },
  },
  plugins: [],
};
