import React from "react";
import ErrorCssSetting from "../../PageParts/AuthParts/ErrorCssSetting";

export default function LoginEffects(error,setErrorCss,setError,setUserName,setPassWord,RetrivePassword){
    // エラーCSSのセッティング
    React.useEffect(()=>{
      ErrorCssSetting(error,setError,setErrorCss);
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