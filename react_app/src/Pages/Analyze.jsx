import { Link, useLocation,useNavigate} from "react-router-dom";
import React from "react";
import LoginSessionCheck from "./Auth/LoginSessionCheck";


export default function Analyze(){

  // ログインしていないときは戻る
  LoginSessionCheck("analyze");  
  // リンク元からデータの受け取り
  const location=useLocation();
  
  // 結果がないときはエラー
  const navigate=useNavigate()

  React.useEffect(()=>{
    if(!location?.state?.data){
      navigate("/error",{state:{"outURL":"","type":"データがありません"}});
    }
  },[location]);

  const postData=location?.state?.data || null;
  // useEffectは全ての処理が終わってからではないと実行されないため、postDataがnullの場合はひとまず処理を行う（実際には表示されない）。
  if(postData==null){
    return(<div>まだ投稿はありません</div>)
  }


  // 順位表示
  const TdComponent=()=>
    postData.rank.map((eachData)=>{
      // 50位以下は省く
      if(Number(eachData.number)>50){
        return null;
      }

      return(
        // 今回の投稿がランクに含まれていたら色を変更
        <tr key={eachData.id} className={postData.now_ginza_sets.includes(eachData.words) ? "bg-yellow-100":"" }>
          <td className="base_td_notRightEnd">{eachData.number}</td>
          <td className="base_td_notRightEnd">{eachData.c}</td>
          <td className="base_td_rightEnd">{eachData.words}</td>
        </tr>
      );
  });
  
  return(
    <>
      <div className="base_frame">
        <div>　</div>
        <p className="base_p">以下の文面の解析を完了しました</p>
        <div className="mt-5 p-3 bg-green-200"><p className="bg-green-50 border-black border-b-2 p-1">{postData.sentence}</p>
        <p className="bg-green-50 border-black border-b-2 p-1">筆者...{postData.author}</p>
        <p className="bg-green-50 border-black border-b-2 p-1">媒体...{postData.source}</p>
        </div>
      </div>

      <p className="base_p mt-5">現在のランキング</p>
      <table className="base_table base_frame text-center">
        <thead>
          <tr>
            <th className="base_td_notRightEnd">順位</th>
            <th className="base_td_notRightEnd">回数</th>
            <th className="base_td_rightEnd">言葉</th>
          </tr>
        </thead>
        <tbody>
          <TdComponent/>
        </tbody>
      </table>
    <p className="base_p mt-2">詳細事項は<Link className="text-blue-700 underline" to="/detail">こちら</Link></p>
    <p className="base_p mt-5"><Link className="text-blue-700 underline" to="/">戻る</Link></p>
    <div>　</div>
    </>
  )

}