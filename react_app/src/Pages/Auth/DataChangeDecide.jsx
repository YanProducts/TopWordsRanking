// 実際にユーザーネームかパスワードのどちらかを変更する

import React from "react"
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async'
import DataChangeDecideDefinition from "../Components/BaseDefinition/Auth/DataChangeDecideDefinition";
import DataChangeDecideAction from "../Components/HandleAction/Auth/DataChacngeDecideAction";
import DefaultSetting from "../Components/Defaults/Pages/DefaultSettingOnAuth";
import DataChangeEffect from "../Components/Effects/Auth/DataChangeEffects";
import { ValidationError } from "../Components/PageParts/AuthParts/ValidationError";

export default function DataChangeDecide(){

  // 初期定義
  const {apiURL,fromURL,navigate,location,choice,setChoice,error,setError,errorCss,setErrorCss,errorCss2,setErrorCss2,registerOk,setRegisterOk,fetchOK,setFetchOK,oldUserName,setOldUserName,oldPassWord,setOldPassWord,newLoginField,setNewLoginField,passWord2,setPassWord2,oldUserNameRef,oldPassWordRef,newLoginFieldRef,passWordRef2,envType,setEnvType,token,setToken} = DataChangeDecideDefinition();

  // ハンドルアクション定義
  const {onOldUserNameChange,onOldPassWordChange,onNewLoginFieldChange,onPassWord2Change,onDataChangeDecideBtnClick}=DataChangeDecideAction(setOldUserName,oldUserNameRef,setOldPassWord,oldPassWordRef,setNewLoginField,newLoginFieldRef,setPassWord2,passWordRef2,newLoginField,passWord2,choice,setError,registerOk,setRegisterOk,setFetchOK,token,oldUserName,oldPassWord,envType,navigate);


  // 初期変数取得
  DefaultSetting(apiURL,fromURL,setToken,"",setEnvType,navigate)

  // useEffect系列
  DataChangeEffect(location,navigate,setChoice,error,setError,setErrorCss,setErrorCss2,registerOk,setRegisterOk,fetchOK,setFetchOK,token,choice,oldUserName,oldPassWord,newLoginField);


  return(
    <HelmetProvider>
      <Helmet title="よく使う言葉ランキング-登録データ変更-"></Helmet>
      <div>　</div>
      <h1 className="base_h1 mb-5">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor text-center mb-10">-登録データ変更-</p>

      <div className="my-10 base_frame border-2 border-black rounded-md text-center py-5 bg-green-50 max-w-[700px]">
        <h2 className="base_h w-[90%] min-w-[280px] text-lg mb-5">それぞれ入力してください</h2>

        <div className="base_frame text-left my-3 px-2">
          <p>今までのユーザー名<span className="text-sm text-red-400"></span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="text" value={oldUserName} onChange={onOldUserNameChange} ref={oldUserNameRef}/>
        </div>


        <div className="base_frame text-left my-5 px-2">
          <p>パスワード<span className="text-sm text-red-400">(大文字小文字数字全て含む8字以上)</span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={oldPassWord} onChange={onOldPassWordChange} ref={oldPassWordRef}/>
        </div>
        {ValidationError(error,errorCss,errorCss2,"register","oldSets")}


        <div className="base_frame text-left my-5 px-2">
          <p>新しい{`${choice==="userName" ? "ユーザーネーム" : "パスワード"}`}</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type={choice==="userName" ? "text" : "password"} value={newLoginField} onChange={onNewLoginFieldChange} ref={newLoginFieldRef}/>
        </div>
        {ValidationError(error,errorCss,errorCss2,"register",choice)}

      {choice==="passWord" && (
        <div className="base_frame text-left my-5 px-2">
          <p>パスワード<span className="text-sm text-red-400">(確認用)</span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord2} onChange={onPassWord2Change} ref={passWordRef2}/>
        </div>
        )}
        {ValidationError(error,errorCss,errorCss2,"register","passWord2")}


        <div className="base_btn_div">
          <button className="base_btn" onClick={onDataChangeDecideBtnClick}>決定！</button>
        </div>

        <p className='base_link_p min-w-[280px] mt-4'><Link className='base_link' to="/auth/login">ログインページに戻る</Link></p>

      </div>

    {/* 空白用 */}
    <div>　</div>
    </HelmetProvider>
  )

}