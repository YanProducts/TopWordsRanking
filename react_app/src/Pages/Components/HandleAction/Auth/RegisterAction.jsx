import React from "react";
export default function RegisterAction(setUserName,userNameRef,setPassWord,passWordRef,setPassWord2,passWordRef2,userName,passWord,passWord2,setError,setFetchOK,RegisterPatternCheck){
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
  
    // パスワード入力
    const onPassWord2Change=(e)=>{
      setPassWord2(e.target.value);
      passWordRef2.current.focus()
    }

      // ログインボタンクリック
      const onRegisterBtnClick=()=>{
        // この内部でsetFetchOKを操作し、OKだったらfetchOKが変化してuseEffectに向かう
        RegisterPatternCheck(userName,passWord,passWord2,setError,setFetchOK);
      }

    return{onUserNameChange,onPassWordChange,onPassWord2Change,onRegisterBtnClick}
}