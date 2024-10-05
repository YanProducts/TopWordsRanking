import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function ShowErrorPage(props){

  const location=useLocation();
  const [fromURL,setFromURL] =React.useState("");
  const [errorType,setErrorType] =React.useState("");

  React.useEffect(()=>{
    const state=location.state

    if(state?.outURL==="index"){
      setFromURL("Index")
    }
    setErrorType(state?.type);
  },[location.state])

  const BackComponent=()=>{
    if(fromURL==="Index"){
     return null;
    }  
   return(
      <p className="base_link_p text-blue-700 font-bold underline cursor-pointer"><Link to="/index">戻る</Link></p>
    )
   }

   
  return(
    <>
    <HelmetProvider>
      <Helmet><title>エラーのお知らせ</title></Helmet>
        <div>　</div>
        <h2 className="base_h text-2xl mt-10 mb-5 p-5">エラーのお知らせ</h2>
        <h1 className="base_h base_h1 mt-5 mb-5 p-10 text-red-500">{errorType}</h1>
        <BackComponent/>
    </HelmetProvider>
    </>
  )
}