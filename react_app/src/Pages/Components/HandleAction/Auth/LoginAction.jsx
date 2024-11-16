import React from "react";
import LoginFetch from "../../Fetch/Auth/LoginFetch";

export default function LoginAction(setUserName,userNameRef,setPassWord,passWordRef,checkValue,setCheckValue,token,userName,passWord,navigate,setError,error,PasswordStoreToStorage,envType){
    // ユーザー名入力
    const onUserNameChange=(e)=>{
      setUserName(e.target.value);
      userNameRef.current.focus()
    }
    
    // パスワード入力
    const onPassWordChange=(e)=>{
      setPassWord(e.target.value);
      passWordRef.current.focus()
    }

      // 保存ボタンをクリック
    const onCheckClick=()=>{
      setCheckValue(!checkValue);
   }

  // ログインボタンクリック
  const onLoginBtnClick=()=>{
    LoginFetch(token,userName,passWord,checkValue,navigate,setError,envType,PasswordStoreToStorage);
  }

  return{onUserNameChange,onPassWordChange,onCheckClick,onLoginBtnClick}
}