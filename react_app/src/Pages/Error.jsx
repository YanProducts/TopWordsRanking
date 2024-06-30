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
      <p><Link to="/index">戻る</Link></p>
    )
   }

   
  return(
    <>
    <HelmetProvider>
      <Helmet><title>エラーのお知らせ</title></Helmet>
        <div>　</div>
        <h1 className="base_h base_h1 my-20 p-10">{errorType}</h1>
        <BackComponent/>
    </HelmetProvider>
    </>
  )
}