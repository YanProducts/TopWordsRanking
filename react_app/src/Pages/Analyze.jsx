import { Link } from "react-router-dom"

export default function Analyze(){
  return(
    <>
      <div>
        <p>以下の文面の解析を完了しました</p>
      </div>

      <p>現在のランキング</p>
      <table>
        <tr>
        </tr>
      </table>
    <p>詳細事項は<Link href="/detail">こちら</Link></p>
    </>
  )

}