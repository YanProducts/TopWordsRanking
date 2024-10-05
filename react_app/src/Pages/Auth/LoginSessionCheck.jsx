import { useNavigate } from "react-router-dom";
import React from "react";
// 全体にリンクがあったら、まずログインされているかをチェックし、それによって返す場所を決める
export default function LoginSessionCheck(fromURL=""){
  const navigate=useNavigate();
  
  // 複数回実行されないようにする(useRefは同期的でレンダリングされない)
  const isMounted=React.useRef(false);


  React.useEffect(()=>{
    const fetchLoginSession=async()=>{
      if(isMounted.current){
        return;
      }
      fetch(
        "/auth/loginSessionCheck",
        {
          method:"get",
          // 送るものは特にない
        }
      ).then(response=>{
        if(!response){
          throw new Error("初期設定のエラーです")
        }
        return response.json()
      }).then(json=>{
        // jsonのloginOkが存在し、かつtrueの時
        if(json?.loginOk){
          // 存在するページから来ている時は何も返さない
          if(["index","analyze","detailMain","detailResults"].includes(fromURL)){
            return null
          }else{
            // 「/」からきた場合はindexに表示
            navigate("/index",{
              state:{"loginName":json.loginname}
            });
          }
        }else{
          navigate("/auth/login");
        }
      }).catch((e)=>{
        console.log(e)
      })
    }
    fetchLoginSession()
    return(()=>{
      isMounted.current=true
    })
  },[])

  
}