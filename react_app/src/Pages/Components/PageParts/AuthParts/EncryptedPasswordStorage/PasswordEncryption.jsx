
// 暗号化したパスワードを返す
export default async function EncryptPassword(password, key) {

  // 暗号化のために必要なUTF8のバイナリデータにテキストを変換するためのオブジェクトを設定
  const encoder = new TextEncoder();
  // 上記のオブジェクトを使って、入力されたパスワードをUTF8に変換
  const encodedPassword = encoder.encode(password);

  //ランダムの値を設定
  const RandomValue = crypto.getRandomValues(new Uint8Array(12));

  // UTF8に整えたパスワード、キー、ランダムな値から暗号化を行う(AES-GCMという、暗号化とデータの整合性を同時に提供するモードを使う場合にはiv(Initialization Vector:ランダムな値)が必要)
  const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: RandomValue },
      key,
      encodedPassword
  );

  // iv(ランダム文字列)とivとキーを元に暗号化されたパスワードを返す
  return { iv: Array.from(RandomValue), data: Array.from(new Uint8Array(encrypted)) };
}


// 鍵の生成
export async function generateKey() {
  return crypto.subtle.generateKey(
      // AES-GCMという、暗号化とデータの整合性を同時に提供するモードを使用。256文字の長さ。
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
  );
}


// ローカルストレージに保存したパスワードの照合
export async function DecryptPassword(encrypted, key) {
  // ストレージに保存されたiv(暗号化と復号に必要なランダムな値)を取り出す(Unit8Arrayで)
  const iv = new Uint8Array(encrypted.iv);
  // 暗号化されたパスワードデータ(キー、パスワード、iv(ランダム値)がセットに保存)を取り出す(Unit8Arrayで)
  const encryptedData = new Uint8Array(encrypted.data);
  //上記の暗号化データとiv(ランダム値)(共にUnit8Array)を複合化(decrypt)する
  const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedData
  );

  // バイナリ形式からtext形式に直すためのオブジェクト
  const decoder = new TextDecoder();

  // 複合化したパスワードを返す
  return decoder.decode(decrypted);
}


