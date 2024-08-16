import React from "react";
import { useNavigate  } from 'react-router-dom';

export default function DefaultSetting(errorState,setErrorState,token,setToken,optionSets,setOptionSets,navigate){

  // 初期値となるoptionの入力
  const headers={
      "Content-Type":"application/json"
    };

  fetch("/api/detail_first_data",{
    method:"post",
    headers:headers,
    body:JSON.stringify({
      "fromURL":"main",
      "defaultPass":process.env.REACT_APP_DEFAULT_PASS
    })
  }).then((response)=>{
    if(!response.ok){
      setErrorState({"outURL":"detail_main","type":"初期設定のエラーです"});
      throw new Error(response.json());
    }
    return response.json()
  }).then((json)=>{
    // token格納
    setToken({
      "token":json.token
    })
    // option格納
    setOptionSets({
      "authors":json.authors,"sources":json.sources,"startYears":json.years,"startMonths":json.months,"startDays":json.days,"endYears":json.years,"endMonths":json.months,"endDays":json.days
    })
  }).catch((e)=>{
    // エラー時の捕捉
    console.log(e);
})
if(errorState.outURL!==""){
  navigate("/error",{state:errorState});
  setErrorState({"outURL":"","type":""});
  }
}