import React from "react";

export default function ErrorCssSetting(error,setError,setErrorCss,setErrorCss2=null){
    // エラーCSSのセッティング
      if(Object.keys(error).length>0){
        setErrorCss("animate-disappear");
        
        // setErrorCss2 が関数なら実行
        if (typeof setErrorCss2 === "function") {
          setErrorCss2("animate-disappear2");
        }
        
        const errorTimeOutSets=setTimeout(()=>{
          setError({})
          setErrorCss("hidden")
          // setErrorCss2 が関数なら実行
          if (typeof setErrorCss2 === "function") {
            setErrorCss2("hidden");
          }
        },3000)
        return (()=>{clearTimeout(errorTimeOutSets)});
      }
}