// 2,4,6,8,10月の変化
export default function defaultDayChange(searchTime,optionSets,setOptionSets,selectRefs){
  // 取得前にはreturn
  if(
    searchTime.startMonth=="" ||
    searchTime.endMonth=="" ||
    optionSets.startDays.length==0 ||
    optionSets.endDays.length==0
  ){
    return;
  }

  // 30日で終わる月
  // 当てはまる条件以外は無限ループを避けるため変更しない

  let month30=[4,6,9,11];
  ["start","end"].forEach((which)=>{
    const dayString=which+"Days"
    console.log(searchTime[which+"Month"]);
    if(month30.includes(Number(searchTime[which+"Month"])) && optionSets[dayString].map(element=>Number(element)).includes(31)){

     // 31日を省く
      setOptionSets(prevState=>({
        ...prevState,
        [dayString]:optionSets[dayString].filter(day=>{
          return day<31;
        })
      }))
      // selectedIndexの調整
      if(selectRefs[dayString.substring(0,dayString.length-1)].current.selectedIndex===30){
        //1日前にする 
        selectRefs[dayString.substring(0,dayString.length-1)].current.selectedIndex=29;
      }
    }
  })


    // ２月の時
    // うるう年も考慮
    // 当てはまる条件以外は無限ループを避けるため変更しない

  let newSetOptionSets={}

    if(Number(searchTime.startMonth)==2){
      if(searchTime.startYear%4===0 && (optionSets.startDays.map(Number).includes(31) || optionSets.startDays.map(Number).includes(30) )){
        newSetOptionSets={
        startDays:optionSets.startDays.filter(day=>{
            return Number(day)<30;            
        })
       }
      }else if(searchTime.startYear%4!==0 && (optionSets.startDays.map(Number).includes(31) || optionSets.startDays.map(Number).includes(30) || optionSets.startDays.map(Number).includes(29))){
        newSetOptionSets={
          startDays:optionSets.startDays.filter(day=>{
              return Number(day)<29;            
          })
         }
      }
    }

    if(Number(searchTime.endMonth)==2){
      if(searchTime.endYear%4===0 &&(optionSets.endDays.map(Number).includes(31) || optionSets.endDays.map(Number).includes(30) )){
        newSetOptionSets={
          ...newSetOptionSets,
          endDays:optionSets.endDays.filter(day=>{
              return Number(day)<30;            
          })
         }
      }else if(searchTime.endYear%4!==0 && (optionSets.endDays.map(Number).includes(31) || optionSets.endDays.map(Number).includes(30) || optionSets.endDays.map(Number).includes(29))){
        newSetOptionSets={
          ...newSetOptionSets,
          endDays:optionSets.endDays.filter(day=>{
              return Number(day)<29;            
          })
         }
      }else{
        return;
      }
    }

    if(Object.keys(newSetOptionSets).length>0){
      setOptionSets(prevState=>({
        ...prevState,
        ...newSetOptionSets
      }))
    }
}