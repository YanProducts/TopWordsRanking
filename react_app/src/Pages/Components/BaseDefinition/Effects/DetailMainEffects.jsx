import React from "react";

export default function DetailMainEffects(postError,setDisappearAnimate,isFirstFinish,optionSets,selectRefs,setSearchTime,setIsFirstFinish,updateSelectedIndex,searchTime,defaultDayChange,setOptionSets){

  // エラーページ。バリデーション後に投稿されたことを考え、1回ずつリセットする
  React.useEffect(()=>{
    if(Object.keys(postError).length===0){
      return;
    }
    // まずはanimateをセット
    setDisappearAnimate("animate-disappear")
    // animateが3秒後に空白になるようにする
    setTimeout(
      ()=>{
        setDisappearAnimate("hidden h-0 my-0")
      }
      ,3000
    )
  },[postError])


  React.useEffect(()=>{
    // 初回かつoptionSetsがセットされた後のみ
    if(isFirstFinish && optionSets.startYears.length>0){
      const date=new Date();
      (selectRefs.author).current.selectedIndex=0;
      (selectRefs.source).current.selectedIndex=0;
      (selectRefs.startYear).current.selectedIndex=0;
      (selectRefs.startMonth).current.selectedIndex=0;
      (selectRefs.startDay).current.selectedIndex=0;
      (selectRefs.endYear).current.selectedIndex=optionSets.endYears.length-1;
      (selectRefs.endMonth).current.selectedIndex=date.getMonth()-1+1;
      (selectRefs.endDay).current.selectedIndex=date.getDate()-1;
        setSearchTime(prevState=>({
          ...prevState,
          "startYear":optionSets.startYears[0],
          "startMonth":1,
          "startDay":1,
          "endYear":optionSets.endYears[optionSets.endYears.length-1],
          "endMonth":date.getMonth()+1,
          "endDay":date.getDate()
        }))
        setIsFirstFinish(false);
    }
  },[optionSets])

    // 月日の変更に応じて選択されるインデックスが変更されたとき
    React.useEffect(()=>{
      // 以下は初回を除く
      if(updateSelectedIndex.length===0){
        // 初回も行う
        defaultDayChange(searchTime,optionSets,setOptionSets,selectRefs)
        return;
      }
  
      // 新たな格納先
      const newSearchTime={};
  
      // 新たな格納場所のキーが存在するもののみ、新しい選択場所に格納
      const newTimeStoreFunction=async()=>{
        await Promise.all(Object.keys(updateSelectedIndex).map((optionName)=>{
  
          // 変更前の場合のエラー防止
          if(optionSets[optionName].length-1<updateSelectedIndex[optionName]){
            return;
          }
    
          // searchTimeの元の値
          newSearchTime[optionName]=(optionSets[optionName][updateSelectedIndex[optionName]]);
  
          const optionNameWithoutS=optionName.substring(0,optionName.length-1);
          
          // 選択先の変更
          selectRefs[optionNameWithoutS].current.selectedIndex=updateSelectedIndex[optionName];
        }))
  
        //CalculateTimeViewingで設定された値を反映 
        await setSearchTime(prevState=>({
          ...prevState,
          newSearchTime
        }));
  
        defaultDayChange(searchTime,optionSets,setOptionSets,selectRefs)
  
      }
      
      newTimeStoreFunction();
  
    // optionSetsとupdateSelectedIndexのどちらが先に来るかにより処理が変わるため、両方が変更された時に合わせる
    },[optionSets,updateSelectedIndex])

}