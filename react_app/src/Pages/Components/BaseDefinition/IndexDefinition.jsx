import React from "react";
import { Link,useNavigate  } from 'react-router-dom';
export default function IndexDefinition(){
    // ページ遷移用
    const navigate=useNavigate();

    // 初期データの設定
    const [defaults,setDefaults]=React.useState({
      "token":"",
      "userName":"",
      "authors":{},
      "sources":{}
    });
  
    // 初期optionのセッティング
    // 初期値は過去データなし
    const [authorOptions,setAuthorOptions]=React.useState(<option hidden key={-1} value="">過去データはありません</option>);
    const [sourceOptions,setSourceOptions]=React.useState(<option hidden key={-1} value="">過去データはありません</option>);
  
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

    return{
      navigate,defaults,setDefaults,authorOptions,setAuthorOptions,sourceOptions,setSourceOptions,error,setError,author,setAuthor,source,setSource,text,setText,AuthorInputRef,SourceInputRef
    }

}