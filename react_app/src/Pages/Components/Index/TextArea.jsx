import { ValidationErrorComponent } from "./ValidationError"
import React from "react";

export const TextAreaComponent=({text,error,onTextAreaChange})=>{
  return(
    <>
      <p className='base_p'>文面を投稿してください</p>
      <textarea onChange={onTextAreaChange} value={text} className="w-full min-w-[300px] h-[600px]"></textarea>
      <ValidationErrorComponent content="request_sentences" error={error}/>
    </>
  )}