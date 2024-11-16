// ログインのStateなどの定義
import React from "react";
import {useNavigate} from 'react-router-dom';
export default function LoginDefinition(){

    // URL設定(定数)
    const apiURL="/api/auth/login_first_data";
    const fromURL="/auth/login";

    // ページ遷移用
    const navigate=useNavigate();

    // ユーザー名とパスワードのstateとref
    const [userName,setUserName]=React.useState("");
    const [passWord,setPassWord]=React.useState("");
    const userNameRef=React.useRef(null);
    const passWordRef=React.useRef(null);
    
    // 保存チェック入力
    const [checkValue,setCheckValue]=React.useState(false);
  
    // tokenと既存ユーザー
    const [token,setToken]=React.useState("")
    const [existedUser,setExistedUser]=React.useState([""])
    // ローカルか否か
    const [envType,setEnvType]=React.useState("REAL");
  
    
    // エラーのhtml表示用
    const [error,setError]=React.useState({});
  
  
    // エラーのcssの値
    const [errorCss,setErrorCss]=React.useState("");


    return{apiURL,fromURL,navigate,userName,setUserName,passWord,setPassWord,userNameRef,passWordRef,checkValue,setCheckValue,token,setToken,existedUser,setExistedUser,error,setError,errorCss,setErrorCss,envType,setEnvType}
}