import React from "react";

// DataChangeの投稿
export default function DataChangeFetch(token,choice,oldUserName,oldPassWord,newLoginField,navigate,setError){

      // postのヘッダー
      const headers={
        "Content-type":"application/json",
        "X-CSRFToken":token
      }
  
      fetch(
      "/api/auth/dataChange",
      {
        method:"POST",
        headers:headers,
        body:JSON.stringify({
          "choice":choice,
          "oldUserName":oldUserName,
          "oldPassWord":oldPassWord,
          "newLoginField":newLoginField
        })
      }
    ).then((response)=>{
      if(!response.json){
        // 不明な処理
        throw new Error("error!");
      }
      return response.json()
    }).then((json)=>{
      if(!json?.message){
        // 不明な処理
        throw new Error("error!")
      }
      if(json.message==="oldPassUnMatch"){
        setError({"notMatched":"元のユーザー名とパスワードが一致しません"})
        return;
      }
      // ユーザー名が登録済
      if(json.message==="sameUserExists"){
        setError({"userExisted":"そのユーザー名は既に使用されています"})
          return;
      }
      if(json.message==="ok"){
        // 成功の場合は遷移
        navigate("/sign",{state:{
          "message":"変更完了しました",
          "fromURL":"/auth/data_change",
          "toPage":"/auth/login",
          "toPageMessage":"ログインページへ",
          "isOK":true,
      }})
      return;
     }
     throw new Error(json?.envType==="local" ? json?.message || "不明な処理です" :"不明な処理です")
    }).catch((e)=>{
      // 不明な処理
      console.log(e)
      // navigate("/error",{state:{"outURL":"auth/data_change","type":e.message}});
    })
}


// 登録した名前に入っているか？
export function RegisterCheck(token,oldUserName,oldPassWord,setError,setRegisterOk,navigate,envType){

  // postのヘッダー
  const headers={
    "Content-type":"application/json",
    "X-CSRFToken":token
  }
  fetch("/api/auth/dataChangeRegisterCheck",
    {
      method:"POST",
      headers:headers,
      body:JSON.stringify({
        "userName":oldUserName,
        "passWord":oldPassWord,
      })
    }
  ).then(response=>{
    if(!response.ok){
      throw new Error("response is not good")
    }
    return response.json()
  }).then(json=>{
    if(json.isOk===null || json.isOk===undefined){
      throw new Error(JSON.stringify(json))
    }

    if(!json.isOk){
      setError({"notMatched":"ユーザー名またはパスワードが違います"})
      return;
    }
    setRegisterOk(true);
  }).catch((e)=>{
      // 不明な処理
       navigate("/error",{state:{"outURL":"auth/register","type":envType==="local" ? e.message :"不明な処理です"}});
  })
}