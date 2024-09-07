import React from "react"
import { Helmet } from "react-helmet-async"

// ログインページ（記入側）
export default function Login(){
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

  // 初期ページのためのエラーセット
  const [error,setError]=React.useState({
    "outURL":"",
    "type":""
  })

  // デフォルト値のセット
  React.useEffect(()=>{
    const headers={
      "Content-Type":"application/json"
    }
    fetch("/api/login_first_data",{
      method:"post",
      headers:headers,
      body:JSON.stringify({
        "fromURL":"fromLogin",
        "defaultPass":process.env.REACT_APP_DEFAULT_PASS
      })
    }).then(response=>{
      if(!response.ok){
        if(response.status==400){
          setErrorState({"outURL":"index","type":"初期設定のエラーです"});
        }
        const errorMessage=response.json().then(json=>json.error)
        throw new Error(errorMessage)
      }
    }).then(json=>{
      setToken(json.token);
      setExistedUser(json.existedUser);
    }).catch((error)=>{
      console.log(error)
    })
  })

  // エラーがあればエラーページへ
  React.useEffect(()=>{
    
  },[error])

  // ログインボタンクリック
  const onLoginBtnClick=()=>{
    fetch("")
  }


  return(
    <>
      <Helmet title="よく使う言葉ランキング-ログイン-"></Helmet>
      <div className="base_frame border-1 border-black border-rasius text-center">
        <h1>ユーザー名とパスワードを入力してください</h1>
        <p>ログインネーム</p>
        <input type="text" value={userName} onChange={onUserNameChange} ref={userNameRef}/>
        <p>パスワード</p>
        <input type="password" value={passWord} onChange={onPassWordChange} ref={passWordRef}/>
        <button onClick={onLoginBtnClick}>送信！</button>
      </div>

    </>
  )
}