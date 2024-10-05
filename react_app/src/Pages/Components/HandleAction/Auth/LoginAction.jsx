import React from "react";
export default function LoginAction(setUserName,userNameRef,setPassWord,passWordRef,checkValue,setCheckValue,token,userName,passWord,navigate,setError,error,PasswordStoreToStorage){
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
            "passWord":passWord
          })
        }
      ).then((response)=>{
        // エラー時
        if(!response.ok){
          throw new error("error!");
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
      
    }).catch(error=>{
      console.log(error.notMatched)
    })
  }
  return{onUserNameChange,onPassWordChange,onCheckClick,onLoginBtnClick}
}