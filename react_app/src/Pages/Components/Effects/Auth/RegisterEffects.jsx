import React from "react";
import ErrorCssSetting from "../../PageParts/AuthParts/ErrorCssSetting";
import RegisterFetch from "../../Fetch/Auth/RegisterFetch";

export default function RegisterEffects(error,setError,setErrorCss,setErrorCss2,fetchOK,token,userName,passWord,navigate,envType){

  // エラーCSSのセッティング
  React.useEffect(()=>{
    ErrorCssSetting(error,setError,setErrorCss,setErrorCss2);
  });
  // 条件が満たされてfetchが可能になった時（isFetchOkの値で確認）
  React.useEffect(()=>{
    // fetch不可なら戻る
    if(!fetchOK){
      return;
    }
    // 登録の投稿
    RegisterFetch(token,userName,passWord,navigate,setError,envType);
  },[fetchOK])


}