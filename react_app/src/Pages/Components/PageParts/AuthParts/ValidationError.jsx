import React from "react";

// バリデーション
// setErrorはすでに出来ていて、それに合わせた処理（stateは使うがstateを変更させない）
export function ValidationError(error,errorCss,errorCss2=null,pageName,columnName){

  // エラー表示の要素だけに付与される
  const returnedComponents=((errorType,index)=>{
    if(errorType.indexOf("<Dammy_br>")===-1){
      return(
        <p key={index} className={`base_frame base_backColor font-bold my-0 text-red-500 text-center min-w-[280px] text-base xmForCustom:text-sm ${errorCss}`}>{errorType}</p>
      )
    }else{
      const errorTypeArray=errorType.split("<Dammy_br>");
      return(
        <p key={index} className={`base_frame base_backColor font-bold my-0 text-red-500 text-center min-w-[280px] text-base xmForCustom:text-sm ${errorCss2 || errorCss}`}>
          {errorTypeArray.map((eachText,index2) =>(
              <React.Fragment key={index2}>
                {eachText}
                {errorTypeArray.length-1!==index && <br/>}
              </React.Fragment>
            ))}
        </p>  
      )
    }
  }
  )
  
  let allReturnedComponents=[];
  switch(pageName){
    case "register":
      switch(columnName){
        case "userName":
          if(error.userPtn!==undefined){
              allReturnedComponents.push(returnedComponents(error.userPtn,0))
            }
          if(error.userLength!==undefined){
            allReturnedComponents.push(returnedComponents(error.userLength,1))
            }
          if(error.userExisted!==undefined){
            allReturnedComponents.push(returnedComponents(error.userExisted,2))
            }
        break;
        case "passWord":
          if(error.passPtn!==undefined){
            allReturnedComponents.push(returnedComponents(error.passPtn,3))
          }
          if(error.passLength!==undefined){
            allReturnedComponents.push(returnedComponents(error.passLength,4))
          }        
        break;
        case "passWord2":
          if(error.passMatch!==undefined){
            allReturnedComponents.push(returnedComponents(error.passMatch,5))
          }
        break;
        // 登録情報変更において必要
        case "oldSets":
          if(error.notMatched!==undefined){
            allReturnedComponents.push(returnedComponents(error.notMatched,6))
          }
        break;
        default:
        break;
      }
    break;
    case "login":
      if(error.notMatched!==undefined){
        allReturnedComponents.push(returnedComponents(error.notMatched,7))
      }
    break;
  }

  return allReturnedComponents;

}