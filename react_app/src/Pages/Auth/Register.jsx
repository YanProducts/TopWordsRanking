import React from "react"
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from "../Components/Defaults/Pages/DefaultSettingOnAuth";
import { RegisterPatternCheck } from "../Components/PageParts/AuthParts/RegisterPatternCheck";
import { ValidationError } from "../Components/PageParts/AuthParts/ValidationError";
import RegisterDefinition from "../Components/BaseDefinition/Auth/RegisterDefinition";
import RegisterAction from "../Components/HandleAction/Auth/RegisterAction"
import RegisterEffects from "../Components/Effects/Auth/RegisterEffects"

// ログインページ（記入側）
export default function Register(){

  // 変数とstate
  const {apiURL,fromURL,navigate,userName,setUserName,passWord,setPassWord,passWord2,setPassWord2,userNameRef,passWordRef,passWordRef2,token,setToken,envType,setEnvType,error,setError,errorCss,setErrorCss,errorCss2,setErrorCss2,fetchOK,setFetchOK} =RegisterDefinition()

  // ハンドルアクション
  const{onUserNameChange,onPassWordChange,onPassWord2Change,onRegisterBtnClick}=RegisterAction(setUserName,userNameRef,setPassWord,passWordRef,setPassWord2,passWordRef2,userName,passWord,passWord2,setError,setFetchOK,RegisterPatternCheck)

  // Effect系列
  RegisterEffects(error,setError,setErrorCss,setErrorCss2,fetchOK,token,userName,passWord,navigate,envType)


  // デフォルト値のセット
  // ここでjsonに値がセットされ、tokenが定義される。
  // 登録済ユーザーはfetchの際にチェック（その間の更新に対応）
  DefaultSetting(apiURL,fromURL,setToken,"",setEnvType,navigate)


  return(
    <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト！-新規ユーザー登録-</title>
      </Helmet>
      {/* 空白用 */}
      <div>　</div>
      <h1 className="base_h1 mb-2">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor text-center mb-10">-ユーザー登録-</p>

      <div className="my-10 base_frame border-2 border-black rounded-md text-center py-5  bg-green-50 max-w-[700px]">
        <h2  className="base_h w-[90%] min-w-[280px] text-lg mb-5">ユーザー名とパスワードを<br className="sm:hidden"/>決めてください</h2>

        <div className="base_frame text-left my-3 px-2">
          <p>ユーザー名<span className="text-sm text-red-400">(半角3文字以上)</span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="text" value={userName} onChange={onUserNameChange} ref={userNameRef}/>
        </div>
        {ValidationError(error,errorCss,errorCss2,"register","userName")}


        <div className="base_frame text-left my-5 px-2">
          <p>パスワード<span className="text-sm text-red-400"><br className="sm:hidden"/>(大文字小文字数字全て含む8字以上)</span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord} onChange={onPassWordChange} ref={passWordRef}/>
        </div>
        {ValidationError(error,errorCss,errorCss2,"register","passWord")}


        <div className="base_frame text-left my-5 px-2">
          <p>パスワード<span className="text-sm text-red-400">(確認用)</span></p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord2} onChange={onPassWord2Change} ref={passWordRef2}/>
        </div>
        {ValidationError(error,errorCss,errorCss2,"register","passWord2")}

        <div className="base_btn_div">
          <button className="base_btn" onClick={onRegisterBtnClick}>決定！</button>
        </div>

        <p className='base_link_p min-w-[280px]'>ログインは<Link className='base_link' to="/auth/login">こちら</Link></p>

      </div>

      {/* 空白用 */}
      <div>　</div>
      </HelmetProvider>

  )
}