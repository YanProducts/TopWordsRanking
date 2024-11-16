// 登録の際の条件にあっているか？
// existedUserは登録のfetch時にチェックした方が、「ページに到達した後の登録」に備えることができる
export function RegisterPatternCheck(userName,passWord,passWord2,setError,setFetchOK,fromURL="Register"){
  
  let returnedError={};

  // ユーザーネームのパターンチェック
  UserNamePatternCheck(userName,returnedError);
 
  // パスワードのパターンチェック
  PassWordPatternCheck(passWord,returnedError)

  // パスワードの一致チェック
  PassWordMatchCheck(passWord,passWord2,returnedError)

  // エラー挿入
  if(Object.keys(returnedError).length===0){
    setFetchOK(true);
  }else{
    setFetchOK(false);
    setError(returnedError);
  }

}


// ユーザーネームのパターンチェック
export function UserNamePatternCheck(userName,returnedError){
  const userPtn=/[^A-Za-z0-9]+$/u;
  if(userName.match(userPtn)){    
   returnedError["userPtn"]="ユーザー名は半角英数字以外は使えません"
  }
  if(userName.length<3){
    returnedError["userLength"]="ユーザー名は3文字以上必須です"
    }
}

// パスワードのパターンチェック
export function PassWordPatternCheck(passWord,returnedError){
  const passPtn=/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).+$/;
  if(!passWord.match(passPtn)){
    returnedError["passPtn"]="パスワードは<Dammy_br>半角数字/大文字/小文字全て必須です";
    }
 
  if(passWord.length<8){
    returnedError["passLength"]="パスワードは8文字以上必須です";
    }
}

// パスワードが等いかのチェック
export function PassWordMatchCheck(passWord,passWord2,returnedError){
  if(passWord!==passWord2){
      returnedError["passMatch"]="2つのパスワードが一致しません";
    }
}