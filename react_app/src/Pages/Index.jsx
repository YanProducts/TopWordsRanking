import { Helmet, HelmetProvider } from 'react-helmet-async'
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ComponentsForPost } from './Components/Index/ForPost';

export default function Index(){
  // ページ遷移用
  const navigate=useNavigate();

 // 初期データの設定
  const [defaults,setDefault]=React.useState({
    "token":"",
    "authors":{},
    "sources":{}
  });

  // 過去の投稿におけるsqlデータ変数取得
  React.useEffect(()=>{
    const headers={
      "Content-Type": "application/json"
    }
    fetch(
      "/api/first_data",{
        method:"post",
        headers:headers,
        // 実際に渡す必要はない
        body: JSON.stringify({
          fromURL: "fromIndex"
        })
      }
    ).then((response)=>{
      if(!response.ok){
        console.log(response)
        // エラーページへ
        navigate("");
        
        return;
      }else{
       return response.json();
      }
    }).then((json)=>{
      setDefault({
        "token":json.token,
        "authors":json.authors,
        "sources":json.sources
      })
    })    
  },[])

  // 初期optionのセッティング
  const [authorOptions,setAuthorOptions]=React.useState("")
  const [sourceOptions,setSourceOptions]=React.useState("")
  
  // defaultsの更新状態の確認
  React.useEffect(()=>{
    if(Object.keys(defaults.authors).length>0){
      const newAuthorOptions=Object.entries(defaults.authors).map(([key,value])=>{
            return(<option key={key}>{value}</option>)
          })
      setAuthorOptions(newAuthorOptions)
      const newSourceOptions=Object.entries(defaults.sources).map(([key,value])=>{
        return(<option key={key}>{value}</option>)
      })
      setSourceOptions(newSourceOptions)
    }
  },[defaults])   
  
  // 投稿の各データ
  const [author,setAuthor]=React.useState("");
  const [source,setSource]=React.useState("");
  const [text,setText]=React.useState("");

  // input要素のref
  const AuthorInputRef=React.useRef(null);
  const SourceInputRef=React.useRef(null);

  // 各データのselect要素のチェンジ
  // useCallbackを使うことで、その部位以外はレンダリングさせない
  const onAuthorSelectChange=React.useCallback((e)=>{
    setAuthor(e.target.value)
  },[])

  const onSourceSelectChange=React.useCallback((e)=>{
    setSource(e.target.value)
  },[])

  // 各データのinput要素のチェンジ
  // useCallbackを使うことで、その部位以外はレンダリングさせない
  const onAuthorInputChange=React.useCallback((e)=>{
    setAuthor(e.target.value)    
    AuthorInputRef.current.focus({preventScroll: true })
   },[])
  const onSourceInputChange=React.useCallback((e)=>{
    setSource(e.target.value)
    SourceInputRef.current.focus({preventScroll: true })
    }, [])

  // textareaのチェンジ
  const onTextAreaChange=(e)=>{
    setText(e.target.value)
  }

  // エラーのセッティング
  const [error,setError]=React.useState({
    "validationError":{},
    "otherErrors":""
  });



  // 投稿ボタンが押されたとき
  const onBtnClick=(e)=>{
    e.preventDefault();
    const headers={
      "Content-Type":"application/json",
      "X-CSRFToken":defaults.token
    }


    fetch(
      "api/post_data",{
        method:"post",
        headers:headers,
        body:JSON.stringify({
          "request_sentences":text,
          "request_author":author,
          "request_source":source
        })
      }
    ).then((response)=>{
      // 投稿エラー時
      if(!response.ok){
        // バリデーションエラー
        if(response.status===400){
          return response.json().then((validationErrors)=>{
            setError({
              "validationError":validationErrors.allErrors,
              "otherErrors":""
            })
            // setErrorの設定が終わるまでには時間がかかる


            throw new Error("")
          })
        }else{
          console.log(response.json())
        // バリデーション以外のエラー
          throw new Error(response);
        }

      }
      return response.json()
    }).then((json)=>{
      console.log(json.a)
      // ページ遷移
      navigate("/when_post");

    }).catch((e)=>{
      // ローカルと本番で分ける!!!!!!!!!!!!!!!!!!
      // console.error("エラー",e)
      
    })
  }


  

  return(
    <>
     <HelmetProvider>
      <Helmet>
        <title>よく使う言葉リスト！</title>
      </Helmet>

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




    
        <p className='base_link_p'>現在のランクは<Link className='base_link' href="/detail">こちら</Link></p>

        {/* 空白防止用 */}
        <div>　</div>
      </HelmetProvider>
    </>
  )

}