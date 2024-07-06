import React from "react";

export const SetOptionComponents=
  React.memo(({optionType ,type=null})=>{
    return(
      <>
        {(type==="authors" || type==="sources") && (
            <option disabled selected key={-2}>選択してください</option>
        )}
        {optionType.map((t,index)=>(
          <option className="text-center" key={index} value={t}>{t}</option>
        ))}
        {(type==="authors" || type==="sources") && (
            <option key={-1} value="all">全て</option>        
        )}
      </>
    )
  }
)
  
