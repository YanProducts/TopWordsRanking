import React from "react";
import ErrorCssSetting from "../../PageParts/AuthParts/ErrorCssSetting";
import DataChangeFetch from "../../Fetch/Auth/DataChangeFetch";

// 登録内容変更のuseEffect系列
export default function DataChangeEffect(location,navigate,setChoice,error,setError,setErrorCss,setErrorCss2,registerOk,setRegisterOk,fetchOK,setFetchOK,token,choice,oldUserName,oldPassWord,newLoginField){

    // 初期ページからどちらを変更するかが取得されているか
    React.useEffect(()=>{
      if(!location?.state?.which){
        navigate("/error",{state:{
          "outURL":"/atuh/login",
          "type":"リンクがおかしいです"
        }});
      }
      // userNameでもpassWordでもない場合=エラー
      if(!["userName","passWord"].includes(location.state.which)){
        navigate("/error",{state:{
          "outURL":"/atuh/login",
          "type":"リンクがおかしいです"
        }});      
      }
      setChoice(location?.state?.which);
    },[location]);

    // エラーCSSのセッティング
    React.useEffect(()=>{
      ErrorCssSetting(error,setError,setErrorCss,setErrorCss2)},[error])
  

    // fetchを行う前に、ユーザーネームとパスワードがあっているかチェック（後処理と重複するがユーザー体験向上のため残す）
    React.useEffect(()=>{
      if(!registerOk){
        return
      }
      // 確認のアラート
        const confirmSentence=choice==="userName" ? `ユーザーネームを${newLoginField}に変更します\nよろしいですか？`:"パスワードを変更します\nよろしいいですか？";
        if(window.confirm(confirmSentence)){
          setFetchOK(true);
        }
        const registerTimeOut=setTimeout(()=>{
          setRegisterOk(false)
        },0)
        return ()=>{
          clearTimeout(registerTimeOut)
        }
    },[registerOk])


  // fetch送信
  React.useEffect(()=>{
    // fetch準備が整っていない場合はreturn
    if(!fetchOK){
      return;
    }
    DataChangeFetch(token,choice,oldUserName,oldPassWord,newLoginField,navigate,setError);
   },[fetchOK])


}