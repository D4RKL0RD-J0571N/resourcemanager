/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{ts,tsx}",
        "./pages/**/*.ts",
        "./pages/**/*.tsx"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#3b82f6",   // Tailwind indigo
                accent: "#f59e0b"     // amber for subtle accents
            },
            boxShadow: {
                sm: "0 1px 2px rgba(0,0,0,.05)",
                md: "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)"
            }
        },
    },
    plugins: [],
}