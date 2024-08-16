import React from "react";

export function DefaultSetting({navigate,defaults,setDefault,setAuthorOptions,setSourceOptions}){


  // 初期ページのためのエラーセット
  const [errorState,setErrorState]=React.useState({
    "outURL":"",
    "type":""
  });

  // 過去の投稿におけるsqlデータ変数取得
  React.useEffect(()=>{
    const headers={
      "Content-Type": "application/json"
    }
    fetch(
      "/api/first_data",{
        method:"post",
        headers:headers,
        // 初期データ獲得時のパスとURLの照合
        body: JSON.stringify({
          "fromURL": "fromIndex",
          "defaultPass":process.env.REACT_APP_DEFAULT_PASS
        })
      }
    ).then((response)=>{
      
      // 不正アクセスの場合、エラーページへ(遷移のnavigateは遅延を考えuseEffectで定義)
      if(!response.ok){
        console.log(response);


        setErrorState({"outURL":"index","type":"初期設定のエラーです"});
        throw new Error(response.json());
      }else{
       return response.json();
      }
    }).then((json)=>{

      // 初期設定
      setDefault({
        "token":json.token,
        "authors":json.authors,
        "sources":json.sources,
        "env_type":json.env_type
      })
    }).catch((e)=>{
      // エラー時の捕捉
      console.log(e);
    })
  },[])

  // optionの取得
  React.useEffect(()=>{
    if(Object.keys(defaults.authors).length>0){
      const newAuthorOptions=Object.entries(defaults.authors).map(([key,value])=>{
            return(<option key={key}>{value}</option>)
          })
      newAuthorOptions.unshift(
        <option hidden key={-1} value="">選択してください</option>
      );
      setAuthorOptions(newAuthorOptions)

      const newSourceOptions=Object.entries(defaults.sources).map(([key,value])=>{
        return(<option key={key}>{value}</option>)
      })
      newSourceOptions.unshift(
        <option hidden key={-1} value="">選択してください</option>
      )
      setSourceOptions(newSourceOptions)
    }
    
  },[defaults])   

  // 初期設定でのエラーの時のページ遷移
  React.useEffect(()=>{
    if(errorState.outURL!==""){
      navigate("/error",{state:errorState});
      setErrorState({"outURL":"","type":""});
    }
  },[errorState])
// コンポーネントで定義し、何も返さない
  return null;
}