// ユーザーネームとパスワードのどちらを変更するか？

import React from "react"
import { Link,useNavigate  } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'


export default function DataChange(){
  // ページ遷移用
  const navigate=useNavigate();

  // 選択が変更したとき
  const [choice,setChoice]=React.useState("userName");
  const onAuthChangeChoiceChange=(e)=>{
    setChoice(e.target.value);
  }
  const onChangeBtnClick=()=>{
      // ページ遷移
      navigate("/auth/data_change_decide",{state:{
        which:choice
      }})
  }
  return(
    <HelmetProvider>
      <Helmet title="よく使う言葉ランキング-登録データ変更-"></Helmet>
      <div>　</div>
      <h1 className="base_h1 mb-5 max-w-[600px]">よく使う言葉リスト！</h1>
      <p className="base_frame base_backColor max-w-[600px] text-center mb-10">-登録データ変更-</p>
      <div className="base_frame max-w-[600px] my-10 border-2 border-black rounded-md text-center pt-5 pb-3 bg-green-50">
        <h2 className="base_h w-[90%] min-w-[270px] text-lg mb-5">変更するデータを選んでください</h2>
        <div className="flex base_frame">
          <div className="ml-auto w-1/5 min-w-[130px] sm:min-w-[150px] text-center h-10 sm:text-lg">
            <input type="checkbox" name="whichAuthData" value="userName" onChange={onAuthChangeChoiceChange}/>
            <label>ユーザーネーム</label>
          </div>
          <div className="mr-auto w-1/5 min-w-[130px] sm:min-w-[150px] text-center h-10 sm:text-lg">
            <input type="checkbox" name="whichAuthData" value="passWord" onChange={onAuthChangeChoiceChange}/>
            <label>パスワード</label>
          </div>
        </div>
        
        {/* formで投げるのではなく、useNavigateで遷移のためtokenは必要ない */}

        <div className="base_btn_div my-1">
          <button className="base_btn" onClick={onChangeBtnClick}>決定！</button>
        </div>
      </div>
    </HelmetProvider>
  )
}