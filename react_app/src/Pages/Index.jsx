import { Helmet, HelmetProvider } from 'react-helmet-async'
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import LoginSessionCheck from './Auth/LoginSessionCheck';
import { ComponentsForPost } from './Components/PageParts/IndexParts/ForPost';
import { DefaultSetting } from './Components/Defaults/DefaultSettingOnIndex';
import IndexPostFetch from './Components/Fetch/IndexPostFetch';
import IndexDefinition from './Components/BaseDefinition/IndexDefinition';
import IndexAction from './Components/HandleAction/IndexAction';

export default function Index(){

  // まずはloginされているかの確認。されていなければ、以下の関数からページをnavigate(ページ内部でuseEffect)
  LoginSessionCheck("index");

  // 定義のセット
  const {navigate,defaults,setDefaults,authorOptions,setAuthorOptions,sourceOptions,setSourceOptions,error,setError,author,setAuthor,source,setSource,text,setText,AuthorInputRef,SourceInputRef}=IndexDefinition()

  // ハンドル操作のセット
  const{onAuthorSelectChange,onSourceSelectChange,onAuthorInputChange,onSourceInputChange,onTextAreaChange,onBtnClick}=IndexAction(setAuthor,setSource,setText,AuthorInputRef,SourceInputRef,IndexPostFetch,defaults,text,author,source,setError,navigate)


  return(
    <>
     <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト！</title>
      </Helmet>

      {/* 初期ページに格納 */}
      <DefaultSetting navigate={navigate} defaults={defaults} setDefaults={setDefaults}setAuthorOptions={setAuthorOptions} setSourceOptions={setSourceOptions}/>

        {/* 空白防止用 */}
        <div>　</div>
        <h1 className="base_h1">よく使う言葉リスト！</h1>

      <ComponentsForPost
        error={error}
        text={text}
        author={author}
        source={source}
        authorOptions={authorOptions}
        sourceOptions={sourceOptions}
        onTextAreaChange={onTextAreaChange}
        onAuthorInputChange={onAuthorInputChange}
        onSourceInputChange={onSourceInputChange}
        onAuthorSelectChange={onAuthorSelectChange}
        onSourceSelectChange={onSourceSelectChange}
        AuthorInputRef={AuthorInputRef}
        SourceInputRef={SourceInputRef}
        onBtnClick={onBtnClick}
      />
    

        {(Object.keys(defaults.authors).length!==0 && Object.keys(defaults.sources).length!==0) ? <p className='base_link_p'>現在のランクは<Link className='base_link' to="/detail/main">こちら</Link></p>
        : null}
   
        <p className='base_link_p'><Link className='base_link' to="/auth/logout">ログアウト</Link></p>

        {/* 空白防止用 */}
        <div>　</div>
      </HelmetProvider>
    </>
  )

}