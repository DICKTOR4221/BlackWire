/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0b12",
        neon: {
          cyan: "#00f7ff",
          blue: "#3d7bff",
          pink: "#ff5ac3",
          purple: "#a45cff"
        }
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,247,255,0.35), 0 0 40px rgba(163,92,255,0.25)"
      },
      fontFamily: {
        display: ['"Orbitron"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};