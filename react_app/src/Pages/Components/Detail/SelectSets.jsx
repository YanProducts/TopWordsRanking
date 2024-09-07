import { SetOptionComponents } from "./SetOptionComponents"
import  validationError from "./ValidationError"
import React from "react";

export const SelectSets=({selectRefs,selectChangeTrigger,optionSets,postError})=>{


  // エラーページ用のCSS(エラーページが関数式のため、ここで宣言)
  // アニメーション
  const [disappearAnimate,setDisappearAnimate]=React.useState("");
  // エラーページ。バリデーション後に投稿されたことを考え、1回ずつリセットする
  React.useEffect(()=>{
    // まずはanimateをセット
    setDisappearAnimate("animate-disappear")
    // animateが3秒後に空白になるようにする
    setTimeout(
      ()=>{
        setDisappearAnimate("hidden h-0 my-0")
      }
      ,3000
    )
  },[postError])



  return(
    <>
    <div className="base_frame mt-6 text-center">
      <p className="base_p mb-4">①分析する筆者を選んでください</p>
      <select className="mx-auto w-2/5 min-w-[100px] text-center" ref={selectRefs.author} onChange={(e)=>{selectChangeTrigger(e,"author")}}>
      <SetOptionComponents optionType={optionSets.authors} type={"authors"}/>
      </select>
    </div>
    {validationError("detail_author",postError,disappearAnimate)}

    <div className="base_frame  mt-6 text-center">
      <p className="base_p  mb-4">②分析する媒体を選んでください</p>
      <select className="w-2/5 min-w-[100px] text-center" ref={selectRefs.source} onChange={(e)=>{selectChangeTrigger(e,"source")}}>
      <SetOptionComponents optionType={optionSets.sources} type={"sources"}/>
      </select>
    </div>
    {validationError("detail_source",postError, disappearAnimate)}
    
    <div className="base_frame mt-6">
      <p className="base_p">③分析するのはいつから？</p>
      <div className='mt-6 flex base_frame justify-center'>
        <select className="w-20" onChange={(e)=>{selectChangeTrigger(e,"startYear")}} ref={selectRefs.startYear}>
        <SetOptionComponents optionType={optionSets.startYears} type={"startYear"}/>
        </select>
        <span>年</span>
        <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"startMonth")}} ref={selectRefs.startMonth}>
        <SetOptionComponents optionType={optionSets.startMonths}  type={"startmonth"}/>
        </select>
        <span>月</span>
        <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"startDay")}} ref={selectRefs.startDay}>
        <SetOptionComponents optionType={optionSets.startDays} type={"startDay"}/>
        </select>
        <span>日</span>
      </div>
    </div>
    {validationError("detail_start",postError, disappearAnimate)}


    <div className="base_frame mt-6">
      <p className="base_p">④分析するのはいつまで？</p>
      <div className='flex base_frame justify-center mt-5'>
      <select className="w-20" onChange={(e)=>{selectChangeTrigger(e,"endYear")}}  ref={selectRefs.endYear}>
      <SetOptionComponents optionType={optionSets.endYears} type={"endYear"}/>
      </select>
      <span>年</span>
      <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"endMonth")}}  ref={selectRefs.endMonth}>
      <SetOptionComponents optionType={optionSets.endMonths} type={"endMonth"}/>
      </select>
      <span>月</span>
      <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"endDay")}}  ref={selectRefs.endDay}>
      <SetOptionComponents optionType={optionSets.endDays}  type={"endDay"}/>
      </select>
      <span>日</span>
      </div>
   </div>
   {validationError("detail_end",postError, disappearAnimate)}
  </>
  )
}