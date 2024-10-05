import React from "react";
export default function RegisterEffects(error,setError,setErrorCss,fetchOK,token,userName,passWord,navigate,envType){
  // エラーCSSのセッティング
  React.useEffect(()=>{
    if(Object.keys(error).length>0){
      setErrorCss("animate-disappear");
      const errorTimeOutSets=setTimeout(()=>{
        setError({})
        setErrorCss("hidden")
      },3000)
      return (()=>{clearTimeout(errorTimeOutSets)});
    }
  },[error])

    // 条件が満たされてfetchが可能になった時（isFetchOkの値で確認）
    React.useEffect(()=>{

      // fetch不可なら戻る
      if(!fetchOK){
        return;
      }
  
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
        // ローカルならコンソールにエラー表示
        if(envType==="local"){
          console.log(e.message)
        }      
        // 不明な処理
        navigate("/error",{state:{"outURL":"auth/register","type":"不明な処理です"}});
        return;
    })},[fetchOK])


}