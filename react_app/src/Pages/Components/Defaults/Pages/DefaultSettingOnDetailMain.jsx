import React from "react";
import DefaultSettingProcess from "../DefaultSettingProcess";

export default function DefaultSetting(setDefaults,setOptionSets,navigate){

  // 初期設定のjson
  const [json,setJson]=React.useState({});

  // 初期設定登録の流れ(関数内でjsonにセット)
  DefaultSettingProcess("/api/detail_first_data","detail/main","設定のエラーです",navigate,setJson)

  // jsonが取得されたら、初期変数に格納
  React.useEffect(()=>{
    // タイミングが取得前ならreturn
    if(Object.keys(json).length==0) return

    // jsonのそれぞれのキーが空の場合はエラー
    // jsonのauthorsとsourcesの要素が1つ(「全て」という項目のみ)だけならエラー
    try{
      if(json.authors.length===0 || json.sources.length===0){
        throw new Error("データがありません")
      }
      // token格納
      setDefaults({
        "token":json.token,
        "isLocal":json.env_type
      })
      // option格納
      setOptionSets({
        "authors":json.authors,"sources":json.sources,"startYears":json.years,"startMonths":json.months,"startDays":json.days,"endYears":json.years,"endMonths":json.months,"endDays":json.days
      })
    }catch(e){
      navigate("/error",{state:{"outURL":"/index","type":"データがありません"}});
    }
  },[json])

}
