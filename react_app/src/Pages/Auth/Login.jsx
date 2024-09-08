import React from "react"
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from "../Components/Auth/DefaultSettingOnLogin";

// ログインページ（記入側）
export default function Login(){

  // ページ遷移用
  const navigate=useNavigate();

  // ユーザー名とパスワードのstateとref
  const [userName,setUserName]=React.useState("");
  const [passWord,setPassWord]=React.useState("");
  const userNameRef=React.useRef(null);
  const passWordRef=React.useRef(null);

  // ユーザー名入力
  const onUserNameChange=(e)=>{
    setUserName(e.target.value);
    userNameRef.current.focus()
  }
  
  // パスワード入力
  const onPassWordChange=(e)=>{
    setPassWord(e.target.value);
    passWordRef.current.focus()
  }

  // tokenと既存ユーザー
  const [token,setToken]=React.useState("")
  const [existedUser,setExistedUser]=React.useState([""])

  
  // エラーのhtml表示用
  const [error,setError]=React.useState({
    // "notMatchedError":"",
    // "otherErrors":""
  });


  // エラーのcssの値
  const [errorCss,setErrorCss]=React.useState("");

  // エラーCSSのセッティング
  React.useEffect(()=>{
    if(Object.keys(error).length>0){
      setErrorCss("animate-disappear");
    }
  },[error])

  
  // デフォルト値のセット
  // ここでjsonに値がセットされ、tokenや登録済みユーザーが定義される。
  DefaultSetting(setToken,setExistedUser,navigate)


  // ログインボタンクリック
  const onLoginBtnClick=()=>{
    const headers={
      "Content-Type":"application/json",
      "X-CSRFToken":token,
    }
    fetch(
      "/api/auth/login",{
        method:"post",
        headers:headers,
        body:JSON.stringify({
          "userName":userName,
          "passWord":passWord
        })
      }
    ).then((response)=>{
      // エラー時
      if(!response.ok){
        throw new error("error!");
      }else{
        return response.json()
      }
    }).then(json=>{
      
      console.log("a")
      return;

      // ログイン成功時
      // sessionはflaskで設定済
      if(json.isRight){

        // ページ遷移

        return;
      }else{
        setError({"notMatchedError":"ユーザー名またはパスワードが違います"})
      }
      
    }).catch(error=>{
      console.log(error.notMatchedError)
    })
  }


  return(
    <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト-ログイン-</title>
      </Helmet>
      {/* 空白用 */}
      <div>　</div>
      <h1 className="base_h1">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor text-center mb-10">-ログイン-</p>
      
      <div className="my-10 base_frame border-2 border-black rounded-md text-center p-5 bg-green-50">
        <h2  className="base_h w-[90%] min-w-[300px] text-lg mb-5">ユーザー名とパスワードを入力してください</h2>
        <div className="base_frame text-left my-3 px-2">
          <p>ユーザー名</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="text" value={userName} onChange={onUserNameChange} ref={userNameRef}/>
        </div>
        <div className="base_frame text-left my-5 px-2">
          <p>パスワード</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord} onChange={onPassWordChange} ref={passWordRef}/>
        </div>
        <p className={`${errorCss} base_frame bace_backColor text-red-500 text-center`}>{error?.notMatchedError !== "" ? error?.notMatchedError : ""}</p>
        <div className="base_btn_div">
          <button className="base_btn" onClick={onLoginBtnClick}>送信！</button>
        </div>
      </div>

      {/* 空白用 */}
      <div>　</div>
      </HelmetProvider>

  )
}