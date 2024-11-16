import { Link,useNavigate,useLocation } from 'react-router-dom';
import React from 'react';

// 名前かパスワード変更の決定時の定義
export default function DataChangeDecideDefinition(){

  // URL設定(定数)
  const apiURL="/api/auth/dataChange_first_data";
  const fromURL="/auth/dataChange";

  // ページ遷移するためにnavigate設定
  const navigate=useNavigate();
  // useNavigateで渡ってきた変数取得
  const location=useLocation();

  // どちを変更するか
  const [choice,setChoice]=React.useState("userName");

  // エラーの設定
  const [error,setError]=React.useState({});

  // エラーのcssの値
  const [errorCss,setErrorCss]=React.useState("");
  const [errorCss2,setErrorCss2]=React.useState("");
  
  // 送信してもOKか？
  const [registerOk,setRegisterOk]=React.useState(false);
  const [fetchOK,setFetchOK]=React.useState(false);

  // ユーザーネーム(これまで)
  const [oldUserName,setOldUserName]=React.useState("");
  // パスワード(これまで)
  const [oldPassWord,setOldPassWord]=React.useState("");
  // 新しいフィールド
  const [newLoginField,setNewLoginField]=React.useState("");
  // パスワードの確認用
  const [passWord2,setPassWord2]=React.useState("");

  // ユーザーネーム(これまで)ref
  const oldUserNameRef=React.useRef(null);
  // パスワード(これまで)ref
  const oldPassWordRef=React.useRef(null);
  // 新しいフィールドref
  const newLoginFieldRef=React.useRef(null);
  // パスワード確認ref
  const passWordRef2=React.useRef(null);

  // 開発環境か否か
  const [envType,setEnvType]=React.useState("REAL");

  // 初期のtoken取得
  const [token,setToken]=React.useState("");

  return({apiURL,fromURL,navigate,location,choice,setChoice,error,setError,errorCss,setErrorCss,errorCss2,setErrorCss2,registerOk,setRegisterOk,fetchOK,setFetchOK,oldUserName,setOldUserName,oldPassWord,setOldPassWord,newLoginField,setNewLoginField,passWord2,setPassWord2,oldUserNameRef,oldPassWordRef,newLoginFieldRef,passWordRef2,envType,setEnvType,token,setToken});

}