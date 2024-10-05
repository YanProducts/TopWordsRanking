import React from "react";
export default function IndexAction(setAuthor,setSource,setText,AuthorInputRef,SourceInputRef,IndexPostFetch,defaults,text,author,source,setError,navigate){
  // 各データのselect要素のチェンジ
  const onAuthorSelectChange=(e)=>{
    setAuthor(e.target.value)
  }
  const onSourceSelectChange=(e)=>{
    setSource(e.target.value)
  }

  // 各データのinput要素のチェンジ
  const onAuthorInputChange=(e)=>{
    setAuthor(e.target.value)    
    AuthorInputRef.current.focus({preventScroll: true })
   }
  const onSourceInputChange=(e)=>{
    setSource(e.target.value)
    SourceInputRef.current.focus({preventScroll: true })
    }

  // textareaのチェンジ
  const onTextAreaChange=(e)=>{
    setText(e.target.value)
  }

  // 投稿ボタンが押されたとき
  const onBtnClick=React.useCallback((e)=>{
    e.preventDefault();
    if(!navigate){
      return;
    }
    IndexPostFetch(defaults,text,author,source,setError,navigate);    
  },[defaults,text,author,source,setError,navigate])

  return{onAuthorSelectChange,onSourceSelectChange,onAuthorInputChange,onSourceInputChange,onTextAreaChange,onBtnClick}
}