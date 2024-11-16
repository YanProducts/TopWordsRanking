/** @type {import('tailwindcss').Config} */
const baseDisappear={
  "0%,99%":{
    visibility:"visible",
    marginTop:"5px",
    marginBottom:"5px",
    opacity:1,
  },
  "100%":{
    visibility:"hidden",
    marginTop:"0px",
    marginBottom:"0px",
    opacity:0,
    height:"0px",
    lineHeight:"0px",
  }
}



module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Reactコンポーネントのファイルパス
    './build/index.html', // ビルド後のHTMLファイルのパス
    './public/index.html', // 即時実行時のHTMLファイル
  ],
  theme: {
    extend: {
      animation:{
        "disappear":"disappear 3s forwards",
        "disappear2":"disappear2 3s forwards"
      },
      keyframes:{
        disappear:{
          "0%,99%":{
            height:"32px",
            lineHeight:"32px",
            ...baseDisappear[ "0%,99%"],
          },
          "100%":{
            ...baseDisappear[ "100%"],
          }
        },
        disappear2:{
          "0%,99%":{
            height:"52px",
            lineHeight:"25px",
            ...baseDisappear[ "0%,99%"],
          },
          "100%":{
            ...baseDisappear[ "100%"],
          }
        }
      },
      screens:{
        xmForCustom:{
          max:"450px"
      }},
    },
  },
  plugins: [],
}

