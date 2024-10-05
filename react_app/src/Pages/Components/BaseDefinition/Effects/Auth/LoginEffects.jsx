import React from "react";
export default function LoginEffects(error,setErrorCss,setError,setUserName,setPassWord,RetrivePassword){
    // エラーCSSのセッティング
    React.useEffect(()=>{
      if(Object.keys(error).length>0){
        setErrorCss("animate-disappear");
        const errorTimeOutSets=setTimeout(()=>{
          setError({})
          setErrorCss("hidden")
        },3000)
        return (()=>{clearTimeout(errorTimeOutSets)});
      }
    },[error])

      // ローカルストレージからデフォルトのセット
      React.useEffect(()=>{
        const setFromLocalStorage=async()=>{
          if(localStorage.getItem("userName")!==null){
            setUserName(localStorage.getItem("userName"))
          }
      
          if((localStorage.getItem("previousEncryptedPassword")!==null) || (localStorage.getItem("previousEncryptionKey")!==null)){
            setPassWord(await RetrivePassword())
          }
        }
        setFromLocalStorage()
      },[])
}