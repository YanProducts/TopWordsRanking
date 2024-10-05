import React from "react";
import { DefaultSettingProcess } from "../DefaultSettingProcess";

export default function DefaultSetting(setToken,setExistedUser,navigate){
  // 初期設定で返ってくるjson
  const [json,setJson]=React.useState("");

  // 初期変数のセッティングとエラールート
  DefaultSettingProcess("/api/auth/login_first_data","auth/login","設定のエラーです",navigate,setJson);

  // jsonが取得されたら、tokenとすでに登録されたユーザーをセット
  React.useEffect(()=>{
    if((Object.keys(json)).length>0){
      setToken(json.token);
      setExistedUser(json.existedUser);
    }
  },[json])

}
