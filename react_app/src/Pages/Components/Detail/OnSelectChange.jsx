import React from "react";

// 検索のselectの値が変化したとき
export default function onSelectChange(setSearchValue,setSearchTime,type,e){

  switch(type){
    case "author":
      setSearchValue(prevState=>({
          ...prevState,
          "authorSets":e.target.value
      }))
    break;
    case "source":
      setSearchValue(prevState=>({
          ...prevState,
          "sourceSets":e.target.value
      }))
    break;
    case "startYear":
      setSearchTime(prevState=>({
          ...prevState,
          "start_year":e.target.value
        }))
    break;
    case "startMonth":
      setSearchTime(prevState=>({
          ...prevState,
          "start_month":e.target.value
        }))
    break;
    case "startDay":
      setSearchTime(prevState=>({
          ...prevState,
          "start_day":e.target.value
        }))
    break;
    case "endYear":
      setSearchTime(prevState=>({
          ...prevState,
          "end_year":e.target.value
        }))
    break;
    case "endMonth":
      setSearchTime(prevState=>({
          ...prevState,
          "end_month":e.target.value
        }))
    break;
    case "endDay":
      setSearchTime(prevState=>({
          ...prevState,
          "end_day":e.target.value
        }))
    break;
    default:
    // 何もしない

    break;

  }

} 