import { PassWordMatchCheck, UserNamePatternCheck , PassWordPatternCheck } from "../../PageParts/AuthParts/RegisterPatternCheck";
import { RegisterCheck } from "../../Fetch/Auth/DataChangeFetch";

// ユーザーネームやパスワード変更決定時の操作
export default function DataChangeDecideAction(setOldUserName,oldUserNameRef,setOldPassWord,oldPassWordRef,setNewLoginField,newLoginFieldRef,setPassWord2,passWordRef2,newLoginField,passWord2,choice,setError,registerOk,setRegisterOk,setFetchOK,token,oldUserName,oldPassWord,envType,navigate){
    // ユーザーネームの入力変更時
    const onOldUserNameChange=(e)=>{
      setOldUserName(e.target.value);
      oldUserNameRef.current.focus();
    }
    // パスワードの入力変更時
    const onOldPassWordChange=(e)=>{
      setOldPassWord(e.target.value);
      oldPassWordRef.current.focus();
    }
    // 新しい登録フォームの内容変更
    const onNewLoginFieldChange=(e)=>{
      setNewLoginField(e.target.value);
      newLoginFieldRef.current.focus();
    }
    // パスワード確認フォームの内容変更
    const onPassWord2Change=(e)=>{
      setPassWord2(e.target.value);
      passWordRef2.current.focus();
    }

  // データの送信
  const onDataChangeDecideBtnClick=()=>{

    // 同期的にエラーを設定し、setError
    let returnedError={};
    // 新規設定項目の条件チェック(~字以上など)
    if(choice==="userName"){
      UserNamePatternCheck(newLoginField,returnedError);
    }else if(choice==="passWord"){
      PassWordPatternCheck(newLoginField,returnedError);
      PassWordMatchCheck(newLoginField,passWord2,returnedError
      );
    }

    // 同期的にreturnedErrorの長さで判定
    // エラーがある時はfetchOkせずエラー格納
    if(Object.keys(returnedError).length>0){
      setError(returnedError);
      return;
    }

    // まずは現在のデータに入っているかのチェック(後の処理と重複するが、ユーザー体験向上のため、まずは弾いた上で後で変更された際のことを考えて再設定を行う)
    RegisterCheck(token,oldUserName,oldPassWord,setError,setRegisterOk,navigate,envType);
  }

  return{onOldUserNameChange,onOldPassWordChange,onNewLoginFieldChange,onPassWord2Change,onDataChangeDecideBtnClick}
}