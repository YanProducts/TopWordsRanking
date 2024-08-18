import React from "react";

const getDefaultTimeSets=()=>{

  const timeSets={
    "years":[],
    "months":[],
    "days":[]
  };
  const date=new Date();
  const nowYear=date.getFullYear();
  for(let n=2020;n<nowYear+1;n++){
    timeSets.years.push(n);
  }
  for(let n=1;n<13;n++){
    timeSets.months.push(n);
  }
  for(let n=1;n<32;n++){
    timeSets.days.push(n);
  }

  return timeSets;
}

 const yearSetting=(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex,what,otherWhat)=>{
  if(what==="startYear"){
    updateOptions[otherWhat+"s"]=timeSets.years.filter((year)=>{
      return year>=oldSearchTime.startYear;        
    })
  }else if(what==="endYear"){
    updateOptions[otherWhat+"s"]=timeSets.years.filter((year)=>{
      return year<=oldSearchTime.endYear; 
    })
  }else{
    // 何もしない？エラー
  }

    // 現在選択されているendが新しいendリストに含まれるか(初期状態は0)
    newUpdateSelectedIndex[otherWhat+"s"]=0;
    updateOptions[otherWhat+"s"].forEach((year,index)=>{
      if(oldSearchTime[otherWhat]==year){
        newUpdateSelectedIndex[otherWhat+"s"]=index;
        return;
      }
    })

    return[updateOptions,newUpdateSelectedIndex];
 }


//  前の月のセッティング
const startMonthSetting=(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)=>{
      // 前の月以外を操った場合＝「後」より大きい「前」を消す
        updateOptions.startMonths=timeSets.months.filter((month)=>{
            return month<=oldSearchTime.endMonth
          })
        // 現在選択されているstartが新しいstartリストに含まれるか(初期状態は0)
        newUpdateSelectedIndex.startMonths=0;
        updateOptions["startMonths"].some((startMonth,index)=>{
          if(oldSearchTime.startMonth==startMonth){
            newUpdateSelectedIndex.startMonths=index;
            return true;
          }
          return false;
        })
        return[updateOptions,newUpdateSelectedIndex];
  }

  // 後の月のセッティング
  const endMonthSetting=(what,updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)=>{
        // 後の月以外を操った場合＝「前」より小さい「後」を消す
         // 変更がstartMonthの時はstartMonthに合わせて要素を変更 
         if(what==="startMonth"){
           updateOptions["endMonths"]=timeSets.months.filter((month)=>{
             return month>=oldSearchTime.startMonth
            })
            // 変更がstartMonthでない場合は直前のupdateOptionsに合わせて要素を変更(startMonthが既にendMonthに合わせて変更されている可能性)
        }else{
            updateOptions.endMonths=timeSets.months.filter((month)=>{
              return month>=updateOptions.startMonths[newUpdateSelectedIndex.startMonths]
            })
        }
        // 現在選択されているendが新しいendリストに含まれるか(初期状態は0)
        newUpdateSelectedIndex.endMonths=0;
        updateOptions.endMonths.some((endMonth,index)=>{
          if(oldSearchTime.endMonth==endMonth){
            newUpdateSelectedIndex.endMonths=index;
            return true;
           }
           return false;
          })
        return[updateOptions,newUpdateSelectedIndex]
}

// 開始日のセッティング
const startDaySetting=(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)=>{

  updateOptions.startDays=timeSets.days.filter((day)=>{
    return day<=oldSearchTime.endDay;
  })
  // 現在選択されているstartが新しいstartリストに含まれるか(初期状態は0)
  newUpdateSelectedIndex.startDays=0;
  updateOptions.startDays.forEach((startDay,index)=>{
    if(oldSearchTime.startDay==startDay){
      newUpdateSelectedIndex.startDays=index;
      return;
    }
  })
  return [updateOptions,newUpdateSelectedIndex];
}

// 終了日のセッティング
const endDaySetting=(what,updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)=>{
      // 変更がstartMonthでない場合は直前のupdateOptionsに合わせて要素を変更 
      if(what==="startDay"){
        updateOptions.endDays=timeSets.days.filter((day)=>{
          return day>=oldSearchTime.startDay
        })
      }else{
          updateOptions.endDays=timeSets.days.filter((day)=>{
            return day>=updateOptions.startDays[newUpdateSelectedIndex.startDays]
          })
      }
      newUpdateSelectedIndex.endDays=0;
      updateOptions.endDays.forEach((endDay,index)=>{
        if(oldSearchTime.endDay==endDay){
          newUpdateSelectedIndex.endDays=index;
          return;
        }
      })
  return [updateOptions,newUpdateSelectedIndex];
}


// 日時が前もしくは後ろの場合のselectの変更
export function CaluculateTimeViewing(what,oldSearchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex){

  // まずは全てを初期化する(これをしないと2度目以降の変化に対応できない)
  const timeSets=getDefaultTimeSets();

  // アップデートする内容をセット
  let updateOptions={};
  // アップデートした時に何番目のoptionを初期選択にするか
  let newUpdateSelectedIndex={};


  // ①startのendより前の年度を消す
  // ②endのstartより前の年度を消す
  
  if(what==="startYear"){
    [updateOptions,newUpdateSelectedIndex]=yearSetting(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex,what,"endYear")
  }

  if(what==="endYear"){
    [updateOptions,newUpdateSelectedIndex]=yearSetting(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex,what,"startYear")
  }

      
    // ③もしendとstartの年が同じになった場合＝endのstartの月より前を消し、startより前のendを消す  
    if(oldSearchTime.startYear==oldSearchTime.endYear){
      
      // Monthの処理。
      // option変更が開始月ではない時
      if(what!=="startMonth"){
        [updateOptions,newUpdateSelectedIndex]=startMonthSetting(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)
     }

      // option変更が開始月ではない時
      if(what!=="endMonth"){
          [updateOptions,newUpdateSelectedIndex]=endMonthSetting(what,updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)
      }

      // ③②でさらにendとstartの月が同じになった場合＝endのstartの月より前を消し、startより前のendを消す
      if(oldSearchTime.startMonth==oldSearchTime.endMonth){
        
          // 動かしたのが開始日ではない場合は開始日を終了日に合わせる
          if(what!=="startDay"){
            [updateOptions,newUpdateSelectedIndex]=startDaySetting(updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex)
          }
          
          // 動かしたのが終了日ではない場合は終了日を開始日に合わせる
          if(what!=="endDay"){
            [updateOptions,newUpdateSelectedIndex]=endDaySetting(what,updateOptions,timeSets,oldSearchTime,newUpdateSelectedIndex);
          }    
          
        // 違う月だった時（違う月に戻った時）
        }else{
          updateOptions.startDays=timeSets.days;
          updateOptions.endDays=timeSets.days; 
          newUpdateSelectedIndex.endDays=oldSearchTime.endDay-1;
        }

      // 違う年だった時(違う年に戻ったとき)
      }else{
        updateOptions.startMonths=timeSets.months;
        updateOptions.endMonths=timeSets.months; 
        updateOptions.startDays=timeSets.days;
        updateOptions.endDays=timeSets.days; 
        
        // endは前回と同じインデックスならズレる可能性があるので修正
        newUpdateSelectedIndex.endMonths=oldSearchTime.endMonth-1;
        newUpdateSelectedIndex.endDays=oldSearchTime.endDay-1;
      }
      
    // optionはauthorsとsourcesはデフォルト、時間はこのページで設定したデフォルトのtimeSets表示に加え、updateすべきは塗り替える(選択インデックス(selectRef)や選択のvalueは塗り替えることが可能)
     setOptionSets(prevState=>({
      ...prevState,
      ...updateOptions,
     }))

     setUpdateSelectedIndex(newUpdateSelectedIndex);

  }