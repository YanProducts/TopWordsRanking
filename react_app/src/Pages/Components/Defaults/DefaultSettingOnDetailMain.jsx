import React from "react";
import { DefaultSettingProcess } from "./DefaultSettingProcess";

export default function DefaultSetting(errorState,setErrorState,defaults,setDefaults,optionSets,setOptionSets,navigate){

  // 初期設定のjson
  const [json,setJson]=React.useState({});

  // 初期設定登録の流れ(関数内でjsonにセット)
  DefaultSettingProcess("/api/detail_first_data","detail/main","設定のエラーです",navigate,setJson)

  // jsonが取得されたら、初期変数に格納
  React.useEffect(()=>{
    // 取得前ならreturn
    if(Object.keys(json).length==0) return
    // token格納
    setDefaults({
      "token":json.token,
      "isLocal":json.env_type
    })
    // option格納
    setOptionSets({
      "authors":json.authors,"sources":json.sources,"startYears":json.years,"startMonths":json.months,"startDays":json.days,"endYears":json.years,"endMonths":json.months,"endDays":json.days
    })
  },[json])

}
