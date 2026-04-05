/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
          "./app/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
        ],
    theme: {
          extend: {
                  colors: {
                            brand: {
                                        orange: "#f97316",
                                        dark: "#0a0a0f",
                                        card: "rgba(15, 15, 20, 0.7)",
                            },
                  },
                  fontFamily: {
                            display: ["'Playfair Display'", "Georgia", "serif"],
                            body: ["'DM Sans'", "sans-serif"],
                  },
          },
    },
    plugins: [],
};
