// バリデーション
// setErrorはすでに出来ていて、それに合わせた処理（stateは使うがstateを変更させない）
export function ValidationError(error,errorCss,pageName,columnName){

  // console.log(error)
  // console.log(pageName)
  // console.log(columnName)

  // エラー表示の要素だけに付与される
  const returnedComponents=(errorType=>(
    <p className={`${errorCss} base_frame bace_backColor text-red-500 text-center`}>{errorType}</p>
  ))
  

  let allReturnedComponents=[];
  switch(pageName){
    case "register":
      switch(columnName){
        case "userName":
          if(error.userPtn!==undefined){
              allReturnedComponents.push(returnedComponents(error.userPtn))
            }
            if(error.userLength!==undefined){
              allReturnedComponents.push(returnedComponents(error.userLength))
            }
        break;
        case "passWord":
          if(error.passPtn!==undefined){
            allReturnedComponents.push(returnedComponents(error.passPtn))
          }
          if(error.passLength!==undefined){
            allReturnedComponents.push(returnedComponents(error.passLength))
          }        
        break;
        case "passWord2":
          if(error.passMatch!==undefined){
            allReturnedComponents.push(returnedComponents(error.passMatch))
          }
        break;
      }
    break;
    case "login":
      if(error.notMatched!==undefined){
        allReturnedComponents.push(returnedComponents(error.passMatch))
      }
    break;
  }

  return allReturnedComponents;

}