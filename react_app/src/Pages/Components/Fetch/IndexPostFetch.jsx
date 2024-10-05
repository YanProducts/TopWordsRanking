export default function IndexPostFetch(defaults,text,author,source,setError,navigate){
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
        "request_source":source,
        "request_userName":defaults.userName
      })
    }).then((response)=>{
      // 投稿エラー時
      if(!response.ok){
        switch(response.status){
          // CSRF(410に定義)
          case 410:
            setError({
              "validationError":{},
              "otherErrors":"不正な処理です"
            });
          break;
          // バリデーション
          case 400:
            return response.json().then((validationErrors)=>{
              setError({
                "validationError":validationErrors.allErrors,
                "otherErrors":""
              })
              throw new Error(response)
            });
            break;
            // その他のエラー
            case 420:
              setError({
                "validationError":{},
                "otherErrors":"予期せぬエラーです"
              });
            break;
            default:
              // 不明な処理
              navigate("/error",{state:{"outURL":"index","type":"不明な処理です"}});
            break;
          }
          throw new Error(response); 
      }
      return response.json()
    }).then((json)=>{    
      // ページ遷移
      navigate("/when_post",{state:{
        data:json
      }})

    }).catch((response)=>{

      // ローカルならコンソールにエラー表示
      if(defaults.env_type==="local"){
        console.log(response)
      }      
    })
}