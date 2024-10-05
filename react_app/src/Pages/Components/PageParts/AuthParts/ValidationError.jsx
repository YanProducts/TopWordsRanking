// バリデーション
// setErrorはすでに出来ていて、それに合わせた処理（stateは使うがstateを変更させない）
export function ValidationError(error,errorCss,pageName,columnName){

  // エラー表示の要素だけに付与される
  const returnedComponents=((errorType,index)=>(
      <p className={`${errorCss} base_frame bace_backColor my-0 text-red-500 text-center `}  key={index}>{errorType}</p>
  ))
  
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
      }
    break;
    case "login":
      if(error.notMatched!==undefined){
        allReturnedComponents.push(returnedComponents(error.notMatched,6))
      }
    break;
  }

  return allReturnedComponents;

}