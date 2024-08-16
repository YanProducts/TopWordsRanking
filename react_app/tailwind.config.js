/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Reactコンポーネントのファイルパス
    './build/index.html', // ビルド後のHTMLファイルのパス
    './public/index.html', // 即時実行時のHTMLファイル
  ],
  theme: {
    extend: {
      animation:{
        "disappear":"disappear 3s forwards"
      },
      keyframes:{
        disappear:{
          "0%,99%":{
            height:"32px",
            lineHeight:"32px",
            visibility:"visible",
            marginTop:"5px",
            marginBottom:"5px",
            opacity:1,
          },
          "100%":{
            height:"0px",
            lineHeight:"0px",
            visibility:"hidden",
            marginTop:"0px",
            marginBottom:"0px",
            opacity:0,
          }
        }
      }
    },
  },
  plugins: [],
}

