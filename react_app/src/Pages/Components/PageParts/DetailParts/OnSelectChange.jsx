import React from "react";
import { CaluculateTimeViewing } from "./CaluculateTimeViewing";

// 検索のselectの値が変化したとき
export default function onSelectChange(setSearchValue,searchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex,type,e){

  switch(type){
    case "author":
      setSearchValue(prevState=>({
          ...prevState,
          "author":e.target.value,
        }))
    break;
    case "source":
      setSearchValue(prevState=>({
          ...prevState,
          "source":e.target.value,
      }))
    break;
    case "startYear":
      setSearchTime(prevState=>({
          ...prevState,
          "startYear":e.target.value,
        }))
      CaluculateTimeViewing("startYear",{...searchTime,"startYear":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    case "startMonth":
      setSearchTime(prevState=>({
          ...prevState,
          "startMonth":e.target.value
        }))
      CaluculateTimeViewing("startMonth",{...searchTime,"startMonth":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    case "startDay":
      setSearchTime(prevState=>({
          ...prevState,
          "startDay":e.target.value,
        }))
        CaluculateTimeViewing("startDay",{...searchTime,"startDay":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    case "endYear":
      setSearchTime(prevState=>({
          ...prevState,
          "endYear":e.target.value,
        }))
      CaluculateTimeViewing("endYear",{...searchTime,"endYear":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    case "endMonth":
      setSearchTime(prevState=>({
          ...prevState,
          "endMonth":e.target.value
        }))
      CaluculateTimeViewing("endMonth",{...searchTime,"endMonth":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    case "endDay":
      setSearchTime(prevState=>({
          ...prevState,
          "endDay":e.target.value
        }))
      CaluculateTimeViewing("endDay",{...searchTime,"endDay":e.target.value},setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex);
    break;
    default:
    // 何もしない

    break;

  }

} 