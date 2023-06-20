/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            },
        },
        colors: {
            transparent: "transparent",
            blue: {
                light: "#6BA4E9",
                bold: "#3D70B2",
            },
            red: "#D00709",
            white: "#FFFFFF",
            black: {
                bold: "#393A4F",
                light: "#757A91",
            },
            gray: {
                light: "#F7F7F7",
                bold: "#999999",
            },
            green: {
                light: "#41D6C3",
            },
            dark: {
                bold: "#151A23",
                light: "#2F3B50"
            }
        },
    },
    plugins: [],
};
