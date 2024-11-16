import React from "react";

// 登録の投稿
export default function RegisterFetch(token,userName,passWord,navigate,setError,envType){
      // 登録
      const headers={
        "Content-Type":"application/json",
        "X-CSRFToken":token,
      }
      fetch(
        "/api/auth/register",{
          method:"post",
          headers:headers,
          body:JSON.stringify({
            "userName":userName,
            "passWord":passWord
          })
        }
      ).then((response)=>{
        // エラー時
        if(!response.ok){
          console.log(response.json())
          throw new Error("error!");
        }else{
          return response.json()
        }
      }).then(json=>{
        const message=json.message;
        // ログイン可能時
        if(message==="ok"){
          // サインページに移動
          navigate("/sign",{state:{
            "message":"登録完了しました",
            "fromURL":"/auth/register",
            "toPage":"/auth/login",
            "toPageMessage":"ログインページへ",
            "isOK":true,
          }});
          return;
  
        // 使用済みユーザー
        }else if(message==="sameUserExists"){
          setError({"userExisted":"そのユーザー名は既に使用されています"})
          return;
        // 予期せぬエラー
        }else{
          throw new Error(json.message)
        }
    }).catch((e)=>{
        // 不明な処理
        navigate("/error",{state:{"outURL":"auth/register","type":envType==="local" ? e.message :"不明な処理です"}});
        return;
    });
}