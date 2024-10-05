import React from "react";
import { DefaultSettingProcess } from "../DefaultSettingProcess";

export default function DefaultSetting(setToken,setEnvType,navigate){
  // 初期設定で返ってくるjson
  const [json,setJson]=React.useState("");

  // 初期変数のセッティングとエラールート
  DefaultSettingProcess("/api/auth/register_first_data","auth/register","設定のエラーです",navigate,setJson);

  // jsonが取得されたら、tokenとすでに登録されたユーザーをセット
  React.useEffect(()=>{
    if((Object.keys(json)).length>0){
      setToken(json.token);
      setEnvType(json.env_type)
    }
  },[json])

}
