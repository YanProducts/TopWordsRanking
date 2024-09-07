import { Helmet, HelmetProvider } from 'react-helmet-async'
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from '../Components/Detail/DefaultSetting';
import onSelectChange from '../Components/Detail/OnSelectChange';
import DetailMainPostFetch from '../Components/Fetch/DetailMainPostFetch';
import { SelectSets } from '../Components/Detail/SelectSets';
import defaultDayChange from '../Components/Detail/DefaultDayChange';

export default function DetailMain(){
   // ページ遷移用
    const navigate=useNavigate();

    // 初期ページのためのエラーセット
    const [errorState,setErrorState]=React.useState({
      "outURL":"",
      "type":"",
    });

    // post時のエラーセッティング
    const [postError,setPostError]=React.useState({
      "validationError":{},
      "otherErrors":""
    });

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


  React.useEffect(()=>{
    // 初期の設定。isFirstFinishとoptionSetsの両方がセットされる。必ず非同期の順番はoptionSetsが先とする
   const initial_setting=async()=>{
      DefaultSetting(errorState,setErrorState, defaults,setDefaults,optionSets,setOptionSets,navigate)
    }
    initial_setting();
  },[])

  React.useEffect(()=>{
    // 初回かつoptionSetsがセットされた後のみ
    if(isFirstFinish && optionSets.startMonths.length>0){
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

  
  // searchTimeが変更＝月によって30日31日のセットなど
  // React.useEffect(()=>{

  
  // },[searchTime,optionSets])


  // selectが変化した時
  const selectChangeTrigger=React.useCallback((e,type)=>{
    onSelectChange(setSearchValue,searchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex,type,e);
  })

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


  return(
    <>
    <HelmetProvider>
      <Helmet>
        <title>詳細分析</title>
      </Helmet>

      <div>　</div>
      <h2 className="base_h1">詳細分析</h2>

      {/* あとで直す */}

      <p className={`${postError.otherErrors ? (postError.otherErrors!=="" ?  "bg-yellow" : "hidden my-0 h-0"): "hidden my-0 h-0"} base_backColor text-center text-red-500 text-base`}>何らかのエラーが生じました</p>

      <SelectSets 
        selectRefs={selectRefs}
        selectChangeTrigger={selectChangeTrigger}
        optionSets={optionSets}
        postError={postError}
      />

      <div>
        <div className="base_btn_div mt-6">
          <button className="base_btn" onClick={()=>{DetailMainPostFetch(searchValue,searchTime,defaults,setPostError)}}>決定！</button>
        </div>
      </div>


      <p className='base_link_p mt-6'><Link className='base_link'to="/">戻る</Link></p>
        </HelmetProvider>
        </>
      )

}