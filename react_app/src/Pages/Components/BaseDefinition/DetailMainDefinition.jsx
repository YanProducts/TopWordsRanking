import React from "react";
import { useNavigate } from "react-router-dom";
export default function DetailMainDefinition(){
     // ページ遷移用
     const navigate=useNavigate();

     // 初期ページのためのエラーセット
     const [errorState,setErrorState]=React.useState({
       "outURL":"",
       "type":"",
     });
 
     // post時のエラーセッティング
     const [postError,setPostError]=React.useState({
       // "validationError":{},
       // "otherErrors":""
     });
 
       // エラーページ用のCSS
   // アニメーション
    const [disappearAnimate,setDisappearAnimate]=React.useState("");

 // tokenやisLocalなどのdefaults
 const [defaults,setDefaults]=React.useState({});
    
 // 筆者・媒体の選択決定
 const [searchValue,setSearchValue]=React.useState({"author":"","source":""});

 // 時期の候補の選択決定
 const [searchTime,setSearchTime]=React.useState({
   "startYear":"","startMonth":"","startDay":"","endYear":"","endMonth":"","endDay":"",   
 });

 // 初期optionのセッティング
 const [optionSets,setOptionSets]=React.useState({
   "authors":[],"sources":[],"startYears":[],"startMonths":[],"startDays":[],"endYears":[],"endMonths":[],"endDays":[]
 })

 // 月日の表示が変わった時に選択するインデックス
 const [updateSelectedIndex,setUpdateSelectedIndex]=React.useState({});


// 初期設定の反映
 const selectRefs = {
   author: React.useRef(null),
   source: React.useRef(null),
   startYear: React.useRef(null),
   startMonth: React.useRef(null),
   startDay: React.useRef(null),
   endYear: React.useRef(null),
   endMonth: React.useRef(null),
   endDay: React.useRef(null),
 };

 // 最初のレンダリングか否か（optionのセット）
 const [isFirstFinish,setIsFirstFinish]=React.useState(true);



     return{navigate,errorState,setErrorState,postError,setPostError,disappearAnimate,setDisappearAnimate,defaults,setDefaults,searchValue,setSearchValue,searchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex,selectRefs,isFirstFinish,setIsFirstFinish}
  
     
}