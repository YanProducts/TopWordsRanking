import { Helmet, HelmetProvider } from 'react-helmet-async'
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import DefaultSetting from '../Components/Defaults/Pages/DefaultSettingOnDetailMain';
import onSelectChange from '../Components/PageParts/DetailParts/OnSelectChange';
import DetailMainPostFetch from '../Components/Fetch/DetailMainPostFetch';
import { SelectSets } from '../Components/PageParts/DetailParts/SelectSets';
import LoginSessionCheck from '../Auth/LoginSessionCheck';
import DetailMainDefinition from '../Components/BaseDefinition/DetailMainDefinition';
import DetailMainEffects from '../Components/Effects/DetailMainEffects'
import defaultDayChange from '../Components/PageParts/DetailParts/DefaultDayChange';

export default function DetailMain(){

  // ログイン確認
  LoginSessionCheck("detailMain")

  // 変数とstateの定義
  const {navigate,errorState,setErrorState,postError,setPostError,disappearAnimate,setDisappearAnimate,defaults,setDefaults,searchValue,setSearchValue,searchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex,selectRefs,isFirstFinish,setIsFirstFinish}=DetailMainDefinition();

  // 初期データ取得(内部でeffectを呼び出し。optionとtokenをセット)。空の場合は戻る
  DefaultSetting(setDefaults,setOptionSets,navigate)

  // useEffectの定義
  {DetailMainEffects(postError,setDisappearAnimate,isFirstFinish,optionSets,selectRefs,setSearchTime,setIsFirstFinish,updateSelectedIndex,searchTime,defaultDayChange,setOptionSets)}
  
  // selectが変化した時
  const selectChangeTrigger=React.useCallback((e,type)=>{
    onSelectChange(setSearchValue,searchTime,setSearchTime,optionSets,setOptionSets,updateSelectedIndex,setUpdateSelectedIndex,type,e);
  })

  return(
    <>
    <HelmetProvider>
      <Helmet>
        <title>詳細分析</title>
      </Helmet>

      <div>　</div>
      <h2 className="base_h1">詳細分析</h2>

      <p className={`${postError.otherErrors ? (postError.otherErrors!=="" ?  disappearAnimate : "hidden my-0 h-0"): "hidden my-0 h-0"} base_frame base_backColor text-center text-red-500 text-base`}>{postError.otherErrors==="dateError" ? "開始日は終了日より前にしてください" : "何らかのエラーが生じました"}</p>

      <SelectSets 
        disappearAnimate={disappearAnimate}
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