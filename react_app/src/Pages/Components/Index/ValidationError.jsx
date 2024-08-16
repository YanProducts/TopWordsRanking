import React from "react";

// バリデーションエラーのコンポーネント(JSXではなくComponentで渡す)
export const ValidationErrorComponent=({content,error})=>{
  // 項目の中で、さらに個々のエラー
  const [theError,setTheError]=React.useState([])
  // アニメーションに渡す変数
  const [animationClass,setAnimationClass]=React.useState("");

  React.useEffect(()=>{
    if(content in error.validationError){
      const newTheError=error.validationError[content].map((message,index)=>{
        return(
        {
          id:index,
          message:message
      })
    })
    setTheError(newTheError)
    // 前回の値を削除
    setAnimationClass("")
    // その後に、新たにアニメーションをセット
    setTimeout(()=>{setAnimationClass("animate-disappear")},0)
   }
  },[error]) 
  
  return(
    theError.map((s)=>(
      <p className={`${animationClass} base_backColor text-center text-red-500 text-base`} key={s.id}>{s.message}</p>
    ))
  )
}
