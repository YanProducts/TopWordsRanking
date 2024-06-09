import { ValidationErrorComponent } from "./ValidationError"
import React from "react";

export const SourceComponent=({source,error,sourceOptions,onSourceInputChange,onSourceSelectChange,SourceInputRef})=>{

  return(
    <>
      <div className="base_inputAndOption_div">
        <div className="base_spanInInputSes_div">
          <span>媒体</span>
        </div>
        <input ref={SourceInputRef} className='w-2/5  min-w-[100px]' onChange={onSourceInputChange} value={source}/>
        <select className="w-2/5 min-w-[100px]" onChange={onSourceSelectChange}>
        {sourceOptions}
        </select>
      </div>
      <ValidationErrorComponent content="request_source" error={error}/>
    </>
   ) 
  }
  
  
  
  
  