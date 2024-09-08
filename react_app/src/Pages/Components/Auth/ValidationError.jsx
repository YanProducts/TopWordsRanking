export function ValidationError(error,pageName,columnName){

  const returnComponents=()=>{
    <p className="base_frame bace_backColor text-red-500 text-center">{error?.notMatchedError !== "" ? error?.notMatchedError : ""}</p>
  }

  switch(pageName){
    case "register":
      switch(columnName){
        case "userName":

        break;
        case "passWord":
        
        break;
        case "passWord2":
        
        break;
        default:

        break;
      }
    break;
    case "login":

    break;
  }


}