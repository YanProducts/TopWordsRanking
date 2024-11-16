import { Navigate, useNavigate } from "react-router-dom"
import React from "react"

// ログアウト時(flaskでsessionを切った後で初期ページへ)
export default function Logout(){
  const navigate=useNavigate()
  
  React.useEffect(()=>{
    fetch("/api/auth/logout",{
      method:"get"
      // bodyは必要ない
    }).then(response=>{
      if(!response.ok){
        throw new Error(response)
      }
      return response.json()
    }).then(json=>{
      if(json?.logoutOk==="ok"){
        // 初期ページへ
        navigate("/");
      }else{
        throw new Error("ログアウトできません");
      }
    }).catch(e=>{
    navigate("/error",{state:{
      "fromURL":"/auth/logout",
      "type":e
    }});
    })
  },[navigate])

  // navigateするので何も返さない
  return null
}