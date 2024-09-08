import React from "react";
import { DefaultSettingProcess } from "../Commons/DefaultSettingProcess";

export function DefaultSetting({navigate,defaults,setDefault,setAuthorOptions,setSourceOptions}){

  // 取得するjson
  const [json,setJson]=React.useState({});


  // 初期ページにセットの流れ。呼び出し先でsetJson
  DefaultSettingProcess("/api/first_data","index","初期設定のエラーです",navigate,setJson);
  
  
  // jsonがセットされていたら、初期設定を登録
  React.useEffect(()=>{
    if(Object.keys(json).length>0){
      // 初期設定
         setDefault({
           "token":json.token,
           "authors":json.authors,
           "sources":json.sources,
           "env_type":json.env_type
         })
    }
  },[json])

  // 初期設定が登録されたら、optionの取得
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


// コンポーネントで定義し、何も返さない
  return null;
}