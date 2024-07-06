import { Helmet, HelmetProvider } from 'react-helmet-async'
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from '../Components/Detail/DefaultSetting';
import onSelectChange from '../Components/Detail/OnSelectChange';
import { SetOptionComponents } from '../Components/Detail/SetOptionComponents';


export default function DetailMain(){
   // ページ遷移用
    const navigate=useNavigate();

    // 初期ページのためのエラーセット
    const [errorState,setErrorState]=React.useState({
      "outURL":"",
      "type":""
    });

  // token
  const [token,setToken]=React.useState("");
    
  // 筆者・媒体の選択決定
  const [searchValue,setSearchValue]=React.useState({"author":"","source":""});

  // 時期の候補の選択決定
  const [searchTime,setSearchTime]=React.useState({
    "start_year":"","start_month":"","start_day":"","end_year":"","end_month":"","end_day":"",   
  });

  // 初期optionのセッティング
  const [optionSets,setOptionSets]=React.useState({
    "authors":[],"sources":[],"years":[],"months":[],"days":[]
  })

// 初期設定の反映
  React.useEffect(()=>{
    DefaultSetting(errorState,setErrorState, token,setToken,optionSets,setOptionSets,navigate)
  },[])


  // selectが変化した時
  const selectChangeTrigger=React.useCallback((e,type)=>{
    onSelectChange(setSearchValue,setSearchTime,type,e);
  })



  return(
    <>
    <HelmetProvider>
      <Helmet>
        <title>詳細分析</title>
      </Helmet>

      <div>　</div>
      <h2 className="base_h1">詳細分析</h2>
  
      <form action="/detail_each" method="post">
        {/* csrf設定！！！ */}

        <div className="base_frame text-center mb-5">
          <p className="base_p">①分析する筆者を選んでください</p>
          <select className="mx-auto w-2/5 min-w-[100px] text-center" onChange={(e)=>{selectChangeTrigger(e,"author")}}>
           <SetOptionComponents optionType={optionSets.authors} type={"authors"}/>
          </select>
        </div>

        <div className="base_frame text-center mb-5">
          <p className="base_p">②分析する媒体を選んでください</p>
          <select className="w-2/5 min-w-[100px] text-center" onChange={(e)=>{selectChangeTrigger(e,"source")}}>
          <SetOptionComponents optionType={optionSets.sources} type={"sources"}/>
          </select>
        </div>
        
        <div className="base_frame mb-5">
          <p className="base_p">③分析するのはいつから？</p>
          <div className='mt-5 flex base_frame justify-center'>
            <select className="w-20" onChange={(e)=>{selectChangeTrigger(e,"startYear")}}>
            <SetOptionComponents optionType={optionSets.years}/>
            </select>
            <span>年</span>
            <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"startMonth")}}>
            <SetOptionComponents optionType={optionSets.months}/>
            </select>
            <span>月</span>
            <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"startDay")}}>
            <SetOptionComponents optionType={optionSets.days}/>
            </select>
            <span>日</span>
         </div>
         </div>
 
         <div className="base_frame mb-5">
          <p className="base_p">④分析するのはいつまで？</p>
          <div className='flex base_frame justify-center mt-5'>
          <select className="w-20" onChange={(e)=>{selectChangeTrigger(e,"endYear")}}>
          <SetOptionComponents optionType={optionSets.years}/>
          </select>
          <span>年</span>
          <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"endMonth")}}>
          <SetOptionComponents optionType={optionSets.months}/>
          </select>
          <span>月</span>
          <select className="w-12" onChange={(e)=>{selectChangeTrigger(e,"endDay")}}>
          <SetOptionComponents optionType={optionSets.days}/>
          </select>
          <span>日</span>
          </div>

        </div>

        <div className="base_btn_div">
          <button className="base_btn">決定！</button>
        </div>
      </form>

      <div className="">{}</div>

      <p className='base_link_p'><Link className='base_link' href="/">戻る</Link></p>
        </HelmetProvider>
        </>
      )

}