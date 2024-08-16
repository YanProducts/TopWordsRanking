import { ValidationErrorComponent } from "./ValidationError"
import React from "react";

export const TextAreaComponent=({text,error,onTextAreaChange})=>{

  // アニメーションに渡す変数
  const [animationClass,setAnimationClass]=React.useState("");

  // バリデーション以外の投稿時のエラー表示
  const GeneralErrorView=()=>{
      if(error?.otherErrors){
        window.scrollTo(0,0);
        return(<p className="base_backColor text-center text-red-500 text-base animate-disappear">{error.otherErrors}</p>);
      }else{
        return null
      }
    }  

  return(
    <>
      <p className='base_p'>文面を投稿してください</p>
      <GeneralErrorView/>
      <textarea onChange={onTextAreaChange} value={text} className="w-full min-w-[300px] h-[600px]"></textarea>
      <ValidationErrorComponent content="request_sentences" error={error}/>
    </>
  )}