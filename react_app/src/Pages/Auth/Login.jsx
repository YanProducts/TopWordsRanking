import React from "react"
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from "../Components/Defaults/Auth/DefaultSettingOnLogin";
import { ValidationError } from "../Components/PageParts/AuthParts/ValidationError";
import PasswordStoreToStorage from "../Components/PageParts/AuthParts/EncryptedPasswordStorage/PasswordStoreToStrage";
import RetrivePassword from "../Components/PageParts/AuthParts/EncryptedPasswordStorage/PasswordRetrive";
import LoginDefinition from "../Components/BaseDefinition/Auth/LoginDefinition";
import LoginAction from "../Components/HandleAction/Auth/LoginAction"
import LoginEffects from "../Components/BaseDefinition/Effects/Auth/LoginEffects";

// ログインページ（記入側）
export default function Login(){

  // stateと変数の定義
  const{navigate,userName,setUserName,passWord,setPassWord,userNameRef,passWordRef,checkValue,setCheckValue,token,setToken,existedUser,setExistedUser,error,setError,errorCss,setErrorCss}=LoginDefinition()


  // 動的なハンドルの定義
  const {onUserNameChange,onPassWordChange,onCheckClick,onLoginBtnClick}=LoginAction(setUserName,userNameRef,setPassWord,passWordRef,checkValue,setCheckValue,token,userName,passWord,navigate,setError,error,PasswordStoreToStorage)
  
  
  // Effect系列の呼び出し
  {LoginEffects(error,setErrorCss,setError,setUserName,setPassWord,RetrivePassword)}
  
  // デフォルト値のセット
  // ここでjsonに値がセットされ、tokenや登録済みユーザーが定義される。
  DefaultSetting(setToken,setExistedUser,navigate)
  

  return(
    <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト-ログイン-</title>
      </Helmet>
      {/* 空白用 */}
      <div>　</div>
      <h1 className="base_h1 mb-5">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor text-center mb-10">-ログイン-</p>
      
      <div className="my-10 base_frame border-2 border-black rounded-md text-center p-5 bg-green-50">
        <h2  className="base_h w-[90%] min-w-[300px] text-lg mb-5">ユーザー名とパスワードを入力してください</h2>
        <div className="base_frame text-left my-3 px-2">
          <p>ユーザー名</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="text" defaultValue={userName} onChange={onUserNameChange} ref={userNameRef}/>
        </div>
        <div className="base_frame text-left mt-5 mb-2 px-2">
          <p>パスワード</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password"  value={passWord} onChange={onPassWordChange} ref={passWordRef}/>
        </div>
        {/* 違った際のUI表示 */}
        {ValidationError(error,errorCss,"login","matched")}


        <div className="base_frame text-left pl-3 text-lg">
          <input type="checkbox" className="hidden" value={checkValue}/>
        <div className="flex my-4">
          <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-blue-500 peer-checked:border-blue-500 cursor-pointer" onClick={onCheckClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className= {`${checkValue ? "" : "hidden"} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
         </svg>
        </div>
        <p className="my-0 py-0 h-4" style={{"lineHeight":"16px"}}>ログインデータを保存</p>
        </div>


        </div>
        <div className="base_btn_div mb-4">
          <button className="base_btn" onClick={onLoginBtnClick}>送信！</button>
        </div>
        
        <p className='base_link_p'>新規登録は<Link className='base_link' to="/Auth/Register">こちら</Link></p>

      </div>

      {/* 空白用 */}
      <div>　</div>
      </HelmetProvider>

  )
}