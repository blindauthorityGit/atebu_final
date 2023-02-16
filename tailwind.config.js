// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1200px",
            "2xl": "1436px",
            "3xl": "1921px",
        },
        container: {
            sm: "100%",
            md: "960px",
            lg: "1364px",
            xl: "2368px",
        },
        extend: {
            fontFamily: {
                ...fontFamily,
                sans: ["Montserrat", "sans-serif"],
            },
            colors: {
                blackText: {
                    DEFAULT: "#1B1B1C",
                    50: "#757579",
                    100: "#6B6B6F",
                    200: "#57575A",
                    300: "#434346",
                    400: "#2F2F31",
                    500: "#1B1B1C",
                    600: "#000000",
                    700: "#000000",
                    800: "#000000",
                    900: "#000000",
                },
                darkGrey: "#494949",
                primaryColor: {
                    DEFAULT: "#B2AC97",
                    50: "#FFFFFF",
                    100: "#F7F7F5",
                    200: "#E6E4DD",
                    300: "#D5D1C6",
                    400: "#C3BFAE",
                    500: "#B2AC97",
                    600: "#9A9277",
                    700: "#7D755C",
                    800: "#5C5744",
                    900: "#3C392C",
                },
                lightPrimary: "#E6E4DD",
            },
        },
    },
    plugins: [],
};
