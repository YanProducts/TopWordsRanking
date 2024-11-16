import React from "react";

export default function LoginFetch(token,userName,passWord,checkValue,navigate,setError,envType,PasswordStoreToStorage){
  const headers={
    "Content-Type":"application/json",
    "X-CSRFToken":token,
  }
  fetch(
    "/api/auth/login",{
      method:"post",
      headers:headers,
      body:JSON.stringify({
        "userName":userName,
        "passWord":passWord,
      })
    }
  ).then((response)=>{
    // エラー時
    if(!response.ok){
      throw new Error("error!");
    }else{
      return response.json()
    }
  }).then(json=>{
  // ログイン成功時
  // sessionはflaskで設定済
  if(json?.loginOk){        
    // チェックボタンが押されている場合localStorageに登録
    if(checkValue){
      localStorage.setItem("userName",userName)
      PasswordStoreToStorage(passWord)
    }

    // ログインページにページ遷移
    navigate("/index",{state:{
      "loginName":userName
    }});

    return;
  }else{
    // ユーザー名もしくはパスワードが違う表示
    setError({"notMatched":"ユーザー名またはパスワードが違います"})
  }
  
}).catch(e=>{
 // 不明な処理
 navigate("/error",{state:{"outURL":"auth/register","type":envType==="local" ? e.message :"不明な処理です"}});
 return;
})
}