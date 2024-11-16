

export default function ValidationError(what,postError,disappearAnimate){

  if(!postError?.validationError){
    return null
  }

  const error=postError.validationError;


  let validationMessageArray=[];

  // detail_authorとdetail_sourceの場合
  if(what==="detail_author" || what==="detail_source"){
    if(error[what]){
      validationMessageArray.push(what === "detail_author" ? "筆者" : "媒体" + "が見当たりません");
    }
  }else if(what==="detail_start"){

    if(error["detail_start_year"]){
      validationMessageArray.push("開始年の値が不正です");
    }
    if(error["detail_start_month"]){
      validationMessageArray.push("開始月の値が不正です");
    }
    if(error["detail_start_day"]){
      validationMessageArray.push("開始日の値が不正です");
    }
  }else if(what==="detail_end"){
    if(error["detail_end_year"]){
      validationMessageArray.push("終了年の値が不正です")
    }
    if(error["detail_end_month"]){
      validationMessageArray.push("終了月の値が不正です")
    }
    if(error["detail_end_day"]){
      validationMessageArray.push("終了日の値が不正です")
    }
  }



  if(validationMessageArray.length===0){
    return null;
  }
  return(
     validationMessageArray.map((validationMessage,index)=>{
      return(
        <p key={index} className={`${disappearAnimate} base_frame base_backColor text-center text-red-500 text-base`}>{validationMessage}</p>
      )
    })
  )
 



}