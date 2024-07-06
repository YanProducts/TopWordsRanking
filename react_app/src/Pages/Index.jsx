import { Helmet, HelmetProvider } from 'react-helmet-async'
import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import { ComponentsForPost } from './Components/Index/ForPost';
import { DefaultSetting } from './Components/Index/DefaultSetting';
import IndexPostFetch from './Components/Fetch/IndexPostFetch';


export default function Index(){
  // ページ遷移用
  const navigate=useNavigate();

  // 初期データの設定
  const [defaults,setDefault]=React.useState({
    "token":"",
    "authors":{},
    "sources":{}
  });

  // 初期optionのセッティング
  const [authorOptions,setAuthorOptions]=React.useState("");
  const [sourceOptions,setSourceOptions]=React.useState("");

  // エラーのhtml表示用
  const [error,setError]=React.useState({
    "validationError":{},
    "otherErrors":""
  });

  
  // 投稿の各データ
  const [author,setAuthor]=React.useState("");
  const [source,setSource]=React.useState("");
  const [text,setText]=React.useState("");

  // input要素のref
  const AuthorInputRef=React.useRef(null);
  const SourceInputRef=React.useRef(null);

  // 各データのselect要素のチェンジ
  const onAuthorSelectChange=(e)=>{
    setAuthor(e.target.value)
  }
  const onSourceSelectChange=(e)=>{
    setSource(e.target.value)
  }

  // 各データのinput要素のチェンジ
  const onAuthorInputChange=(e)=>{
    setAuthor(e.target.value)    
    AuthorInputRef.current.focus({preventScroll: true })
   }
  const onSourceInputChange=(e)=>{
    setSource(e.target.value)
    SourceInputRef.current.focus({preventScroll: true })
    }

  // textareaのチェンジ
  const onTextAreaChange=(e)=>{
    setText(e.target.value)
  }


  // 投稿ボタンが押されたとき
  const onBtnClick=(e)=>{
    e.preventDefault();
    IndexPostFetch(defaults,text,author,source,setError,navigate);    
  }
  
  

  return(
    <>
     <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト！</title>
      </Helmet>

      {/* 初期ページに格納 */}
      <DefaultSetting navigate={navigate} defaults={defaults} setDefault={setDefault}setAuthorOptions={setAuthorOptions} setSourceOptions={setSourceOptions}/>

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
    
        <p className='base_link_p'>現在のランクは<Link className='base_link' to="/detail/main">こちら</Link></p>

        {/* 空白防止用 */}
        <div>　</div>
      </HelmetProvider>
    </>
  )

}