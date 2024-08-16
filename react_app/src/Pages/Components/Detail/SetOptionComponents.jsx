import React from "react";

export const SetOptionComponents=
// memoを使うことで、selectボックス操作時の変化を防げる
  React.memo(({optionType,type})=>{

    return(
      <>
        {(type==="authors" || type==="sources") && (
            <option disabled key={-2}>選択してください</option>
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
  
