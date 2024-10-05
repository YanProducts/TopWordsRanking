import React from "react";
import { useLocation,Link,useNavigate } from "react-router-dom";

export default function Sign(){

  // navigateで渡された変数の取得
  const location=useLocation();
  const state=location.state; 

  // エラーページに遷移用
  const navigate=useNavigate();

  // 初期値の設定
  const [defaults,setDefaults]=React.useState({
    "message":"",
    "fromURL":"/index",
    "toPage":"/auth/login",
    "toPageMessage":"ログインページへ",
    "isOK":false
  })      


  React.useEffect(()=>{
    // stateがない、またはisOKがないもしくはfalseの時はエラーページへ
    if(!state || !state.isOK){
        // 変数が渡ってきていない時は、エラーページへ
        navigate("/error",{state:{"outURL":state?.fromURL || "index","type":"不明な処理です"}});
    }else{
      // stateで渡したオブジェクトがそのまま使われる
      // オブジェクト未設定のものはdefaultsのまま
      setDefaults(prevState=>({...prevState,...state}));
    }
  },[state])




  return(
    <div className="base_frame p-2">
      <h1 className="base_h text-2xl py-3 mt-3 mb-5">お知らせ</h1>
      <p className="base_p mb-5 py-2">{defaults.message}</p>
      <p className="base_p py-2"><Link className="base_link" to={defaults.toPage}>{defaults.toPageMessage}</Link></p>
    </div>
  )
}