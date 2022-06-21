/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'header':"url('/public/image.png')",
        'details':"linear-gradient(180deg, #0D0D0D 4.84%, rgba(13, 13, 13, 0) 69.88%), url('/public/images.svg')"
      },
      colors:{
        'box':"rgba(0, 221, 156, 0.03);",
        'create':"rgba(7, 75, 129, 0.22)"
      }
    },
  },
  plugins: [],
}

