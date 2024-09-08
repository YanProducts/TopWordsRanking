import React from "react"
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from "../Components/Auth/DefaultSettingOnRegister";
import { RegisterPatternCheck } from "../Components/Auth/RegisterPatternCheck";
import { ValidationError } from "../Components/Auth/ValidationError";

// ログインページ（記入側）
export default function Register(){

  // ページ遷移用
  const navigate=useNavigate();

  // ユーザー名とパスワードのstateとref
  const [userName,setUserName]=React.useState("");
  const [passWord,setPassWord]=React.useState("");
  const [passWord2,setPassWord2]=React.useState("");

  const userNameRef=React.useRef(null);
  const passWordRef=React.useRef(null);
  const passWordRef2=React.useRef(null);

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

  // パスワード入力
  const onPassWord2Change=(e)=>{
    setPassWord2(e.target.value);
    passWordRef2.current.focus()
  }

  // tokenと既存ユーザー
  const [token,setToken]=React.useState("")
  const [existedUser,setExistedUser]=React.useState([""])


  
  // エラーのhtml表示用
  const [error,setError]=React.useState({
    
  });


  // エラーのcssの値
  const [errorCss,setErrorCss]=React.useState("");

  // エラーCSSのセッティング
  React.useEffect(()=>{
    if(Object.keys(error).length>0){
      setErrorCss("animate-disappear");
    }
  },[error])

  // fetchに渡しても良いかの確認
  const [fetchOK,setFetchOK]=React.useState(false);

  
  // デフォルト値のセット
  // ここでjsonに値がセットされ、tokenや登録済みユーザーが定義される。
  DefaultSetting(setToken,setExistedUser,navigate)


  // 条件が満たされてfetchが可能になった時（isFetchOkの値で確認）
  React.useEffect(()=>{

    // fetch不可なら戻る
    if(!fetchOK){
      return;
    }

    // 登録
    const headers={
      "Content-Type":"application/json",
      "X-CSRFToken":token,
    }
    fetch(
      "/api/auth/register",{
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
  },[fetchOK])


  // ログインボタンクリック
  const onRegisterBtnClick=()=>{
    // この内部でsetFetchOKを操作し、OKだったらfetchOKが変化してuseEffectに向かう
    RegisterPatternCheck(userName,passWord,passWord2,setError,setFetchOK)
  }


  return(
    <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト！-新規ユーザー登録-</title>
      </Helmet>
      {/* 空白用 */}
      <div>　</div>
      <h1 className="base_h1 mb-2">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor text-center mb-10">-ユーザー登録-</p>

      <div className="my-10 base_frame border-2 border-black rounded-md text-center p-5 bg-green-50">
        <h2  className="base_h w-[90%] min-w-[300px] text-lg mb-5">ユーザー名とパスワードを決めてください</h2>

        <div className="base_frame text-left my-3 px-2">
          <p>ユーザー名</p>
          <span className="text-center">半角3文字以上</span>
          <input className="w-[100%] border-2 border-black rounded-sm" type="text" value={userName} onChange={onUserNameChange} ref={userNameRef}/>
        </div>
        {ValidationError(error,"register","userName")}


        <div className="base_frame text-left my-5 px-2">
          <p>パスワード</p>
          <span className="text-center">大文字・小文字・数字全てを含む8文字以上</span>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord} onChange={onPassWordChange} ref={passWordRef}/>
        </div>
        {ValidationError(error,"register","passWord")}


        <div className="base_frame text-left my-5 px-2">
          <p>パスワード(確認用)</p>
          <input className="w-[100%] border-2 border-black rounded-sm" type="password" value={passWord2} onChange={onPassWord2Change} ref={passWordRef2}/>
        </div>
        {ValidationError(error,"register","passWord2")}



        <div className="base_btn_div">
          <button className="base_btn" onClick={onRegisterBtnClick}>決定！</button>
        </div>
      </div>

      {/* 空白用 */}
      <div>　</div>
      </HelmetProvider>

  )
}