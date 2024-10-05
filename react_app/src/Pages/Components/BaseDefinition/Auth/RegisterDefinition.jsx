// 新規作成のState系列
import React from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterDefinition(){
    // ページ遷移用
    const navigate=useNavigate();

    // ユーザー名とパスワードのstateとref
    const [userName,setUserName]=React.useState("");
    const [passWord,setPassWord]=React.useState("");
    const [passWord2,setPassWord2]=React.useState("");
  
    const userNameRef=React.useRef(null);
    const passWordRef=React.useRef(null);
    const passWordRef2=React.useRef(null);

      // token
  const [token,setToken]=React.useState("")
  // 開発環境か否か
  const [envType,setEnvType]=React.useState("REAL");
  
  // エラーのhtml表示用
  const [error,setError]=React.useState({});

  // エラーのcssの値
  const [errorCss,setErrorCss]=React.useState("");

  // fetchに渡しても良いかの確認
  const [fetchOK,setFetchOK]=React.useState(false);
  
  return{navigate,userName,setUserName,passWord,setPassWord,passWord2,setPassWord2,userNameRef,passWordRef,passWordRef2,token,setToken,envType,setEnvType,error,setError,errorCss,setErrorCss,fetchOK,setFetchOK}  
}