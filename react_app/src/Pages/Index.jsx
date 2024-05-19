import { Helmet } from 'react-helmet';
import React from 'react';

export default function Index(){
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
        return;
      }else{
       return response.json();
      }
    }).then((json)=>{
      console.log(json)
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
  const [author,setAuthor]=React.useState("選択してください");
  const [source,setSource]=React.useState("選択してください");

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
  }
  const onSourceInputChange=(e)=>{
    setSource(e.target.value)
  }




  // 投稿ボタンが押されたとき
  const onBtnClick=(e)=>{
    e.preventdefault();
    const headers={
      "Content-Type":"application/json",
      "csrf_token":defaults.token
    }
    fetch(
      "api/post_data",{
        method:"post",
        headers:headers,
        body:JSON.stringify({

        })
      }
    )
  }


  // 投稿の要素に関するcomponent
  const ComponentsForPost=()=>{
    return(
      <form id="index_form" method="post" action="/process_form">
         <p>文面を投稿してください</p>
        <textarea>
  
        </textarea>


  <div id="otherInfo">

    <div class="request_inputs">
      <span>筆者</span>
      <input onChange={onAuthorInputChange} value={author}/>
      <select onChange={onAuthorSelectChange}>
        {authorOptions}
      </select>
    </div>


    <div>
    <span>媒体</span>
      <input onChange={onSourceInputChange} value={source}/>
      <select onChange={onSourceSelectChange}>
      {sourceOptions}
      </select>
    </div>
  </div>
        <div>
          <button onClick={onBtnClick}>決定！</button>
          </div>
      </form>
    )
  }



  return(
    <>
      <Helmet>
        <title>よく使う言葉リスト！</title>
        <link type="stylesheet" href="../App.css"></link>
      </Helmet>

        <h1>よく使う言葉リスト！</h1>
      {ComponentsForPost()}

        {/*rm.request_sentences.errors %}
      <div class="if_error_div"><p class="if_error_div">{{ error }}</p></div>
    {% endfor %} */}


    
        <p id="go_to_details">現在のランクは<a href="/detail">こちら</a></p>

    </>
  )

}