import React from 'react';

// post時の操作
export default async function DetailMainPostFetch(searchValue,searchTime,defaults,setPostError){

    // setされていなければreturn
    if(searchValue.author==="" ||  searchValue.source===""){
      alert("筆者と媒体は必ず設定してください");
      return;
    }
    const headers={
      "Content-Type":"application/json",
      "X-CSRFToken":defaults.token,
      "Cache-Control": "no-cache, no-store, must-revalidate"
    }

      fetch(
        "/api/detail_each",{
          method:"post",
          headers:headers,
          body:JSON.stringify({
            detail_author:searchValue.author,
            detail_source:searchValue.source,
            detail_start_year:searchTime.startYear,
            detail_start_month:searchTime.startMonth,
            detail_start_day:searchTime.startDay,
            detail_end_year:searchTime.endYear,
            detail_end_month:searchTime.endMonth,
            detail_end_day:searchTime.endDay,
          })
        }      
      ).then(response=>{
        // エラー時
        if(!response.ok){
          // バリデーションエラー
          if(response.status==400){
            return response.json().then((json)=>{
              if(json?.allErrors){
                setPostError({validationError:json.allErrors})
              }
              throw new Error(json.allErrors);
            })
          }else if(response.status==422){
            return response.json().then((json)=>{
              if(json?.allErrors==="dateError"){
                setPostError({otherErrors:"dateError"})
              }else{
                setPostError({otherErrors:"error!"})              
              }
              throw new Error(json.allErrors);
            })
          }else{
          // その他のエラー
          return response.json().then((json)=>{
            setPostError({otherErrors:"error!"})
            return response.json().then((json)=>{
              throw new Error(json.allErrors);
            })
          })
          }
        }
        return response.json()
      }).then(json=>{

        // 処理が通ったとき
        console.log(json);
        // navigate()
        

     }).catch((response)=>{
      // ローカルなら表示
      if(defaults.env_type==="local"){
        console.log(response)
      }
     })
    
  }

