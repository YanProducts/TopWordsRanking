// ローカルストレージに暗号化したパスワード保存（鍵とiv(ランダム値)を一緒に作る必要あり）
import EncryptPassword from "./PasswordEncryption";
import { generateKey } from "./PasswordEncryption";

// 暗号化されたパスワードの保存
export default async function
PasswordStoreToStorage(password){

        // 鍵の生成
        const key = await generateKey();
        // ランダム文字列とランダム文字列とキーを元に暗号化されたパスワードが返ってくる（RandomValueは既に設定済）
        const encrypted = await EncryptPassword(password, key);
        // ランダム値と、ランダム値とキーを元に暗号化されたパスワードの保存
        localStorage.setItem("previousEncryptedPassword", JSON.stringify(encrypted));
        //キーの保存
        const enctryptedKey=await crypto.subtle.exportKey('raw', key)
        localStorage.setItem('previousEncryptionKey', JSON.stringify(Array.from(new Uint8Array(enctryptedKey))));



}
