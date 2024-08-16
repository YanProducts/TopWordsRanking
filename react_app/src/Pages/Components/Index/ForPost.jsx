import {TextAreaComponent} from "./TextArea";
import {AuthorComponent} from "./Author";
import {SourceComponent} from "./Source";
import React from "react";


// 投稿の要素に関するcomponent
export const ComponentsForPost=({
  error,text,author,source,authorOptions,sourceOptions,onTextAreaChange,onAuthorInputChange,onSourceInputChange,onAuthorSelectChange,onSourceSelectChange,AuthorInputRef,SourceInputRef,onBtnClick
})=>{
  return(
    <div className='base_frame'>
      {/* 文章 */}
      <TextAreaComponent text={text} error={error} onTextAreaChange={onTextAreaChange}/>
      {/* 筆者 */}
      <AuthorComponent author={author} error={error} authorOptions={authorOptions} onAuthorInputChange={onAuthorInputChange} onAuthorSelectChange={onAuthorSelectChange} AuthorInputRef={AuthorInputRef}/>
      {/* 媒体 */}
      <SourceComponent source={source} error={error} sourceOptions={sourceOptions} onSourceInputChange={onSourceInputChange} onSourceSelectChange={onSourceSelectChange} SourceInputRef={SourceInputRef}/>
      <div className="base_btn_div">
        <button className="base_btn" onClick={onBtnClick}>決定！</button>
        </div>
    </div>
)}