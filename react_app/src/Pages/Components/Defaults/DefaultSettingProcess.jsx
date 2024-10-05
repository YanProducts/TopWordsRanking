import React from "react";

// 初期値をセットする全体の流れ
export function DefaultSettingProcess(apiURL,fromURL,errorType,navigate,setJson){
  // 初期ページのためのエラーセット
  const [errorState,setErrorState]=React.useState({
    "outURL":"",
    "type":""
  });

  // 過去の投稿におけるsqlデータ変数取得
  React.useEffect(()=>{
    // navigateが未定義の場合は処理を中断
    if (!navigate){
      return;
    }
    const headers={
      "Content-Type": "application/json"
    }
    fetch(
        apiURL,{
        method:"post",
        headers:headers,
        // 初期データ獲得時のパスとURLの照合
        body: JSON.stringify({
          "fromURL": fromURL,
          "defaultPass":process.env.REACT_APP_DEFAULT_PASS
        })
      }
    ).then((response)=>{

      // 不正アクセスの場合、エラーページへ(遷移のnavigateは遅延を考えuseEffectで定義)
      if(!response.ok){
        setErrorState({"outURL":fromURL,"type":errorType});
        throw new Error(response.json());
      }else{
       return response.json();
      }
    }).then((json)=>{
      // jsonを元ページに返す
      setJson(json);
    }).catch((e)=>{
      // エラー時の捕捉
      console.log(e);
    })
  },[navigate])

  // 初期設定でのエラーの時のページ遷移
  React.useEffect(()=>{
    if(errorState.outURL!==""){
      navigate("/error",{state:errorState});
      setErrorState({"outURL":"","type":""});
    }
  },[errorState])

}