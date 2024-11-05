/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#108342',
        secondary: '#171c19',
        tertiary: '#77867F',
        spring: '#37FF8B',
        tomato: '#FF6542'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

