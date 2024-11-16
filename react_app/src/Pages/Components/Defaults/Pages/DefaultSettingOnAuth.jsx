import React from "react";
import DefaultSettingProcess from "../DefaultSettingProcess";

export default function DefaultSetting(apiURL,fromURL,setToken,setExistedUser,setEnvType,navigate){
  // 初期設定で返ってくるjson
  const [json,setJson]=React.useState("");

DefaultSettingProcess(apiURL,fromURL,"設定のエラーです",navigate,setJson);

// jsonが取得されたら、tokenとすでに登録されたユーザーと開発環境か否かをセット
React.useEffect(()=>{
  if((Object.keys(json)).length>0){
    setToken(json.token);
    setEnvType(json.env_type)
    if(fromURL==="auth/login"){
      setExistedUser(json.existedUser);
    }
  }
},[json])

}
