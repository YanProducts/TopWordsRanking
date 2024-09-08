// 登録の際の条件にあっているか？
export function RegisterPatternCheck(userName,passWord,passWord2,setError,setFetchOK){
  
  const userPtn=/[^A-Za-z0-9]+$/u;
  const passPtn=/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).+$/;

  let returnedError={};

  if(userName.match(userPtn)){
    returnedError={
      ...returnedError,
      "userPtn":"ユーザー名は半角英数字以外は使えません"
   }
  }
 
  if(userName.length<3){
    returnedError={
      ...returnedError,
       "userLength":"ユーザー名は3文字以上必須です"
    }
  }

  if(!passWord.match(passPtn)){
    returnedError={
      ...returnedError,
      "passPtn":"パスワードは半角の数字・大文字・小文字・全てを使用してください"
    }
  }
 
  if(passWord.length<8){
    returnedError={
      ...returnedError,
      "passLength":"パスワードは8文字以上必須です"
    }
  }

  if(passWord!==passWord2){
    returnedError={
      ...returnedError,
    "passMatch":"2つのパスワードが一致しません"
    }
  }

  if(Object.keys(returnedError).length===0){
    setFetchOK(true);
  }else{
    setFetchOK(false);
    setError(returnedError);
  }

}