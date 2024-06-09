/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Reactコンポーネントのファイルパス
    './build/index.html', // ビルド後のHTMLファイルのパス
  ],
  theme: {
    extend: {
      animation:{
        "disppear":"disappear 3s forwards"
      },
      keyframes:{
        disappear:{
          "0%,99%":{
            height:"32px",
            lineHeight:"32px",
            visibility:"visible",
            opacity:1,
          },
          "100%":{
            height:"0px",
            lineHeight:"0px",
            visibility:"hidden",
            opacity:0,
          }
        }
      }
    },
  },
  plugins: [],
}

