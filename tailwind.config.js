module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryyyy: "var(--primary_color)",
        secondary: "var(--secondary_color)",
        text_gray: "var(--tertiary_color)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jedira: ["Jedira-Regular", "sans-serif"],
        jedira_italic: ["Jedira-Italic", "sans-serif"],
      },
      backgroundImage: {
        "primary-gradient": "var(--primary-gradient)",
      },
      keyframes: {
        gradientMove: {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        gradientMove: "gradientMove 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
