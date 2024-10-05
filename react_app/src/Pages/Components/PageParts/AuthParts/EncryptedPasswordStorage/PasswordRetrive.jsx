import {DecryptPassword}  from "./PasswordEncryption";

export default async function RetrivePassword(){
  // 保存されたパスワード(暗号化されたパスワード、その暗号化の元となるキー、両者を紐づけるiv(ランダム値))の取り出し
try{
    const storedEncrypted = JSON.parse(localStorage.getItem('previousEncryptedPassword'));

    // 保存されたキーの取り出し
    const rawKey = new Uint8Array(JSON.parse(localStorage.getItem('previousEncryptionKey')));
    // キーを複合化する
    const key = await crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['decrypt']);

    // パスワードを返す
    const decryptedPassword = await DecryptPassword(storedEncrypted, key);
    return decryptedPassword;
  }catch(e){
    console.log(e)
    return null;
  }
}
