import bcrypt

# 登録事項関係のpost
class AuthPost:
  def __init__(self,sql,read):
    self._sql=sql
    self._read=read


#  新規登録
  def store(self,userName,passWord):
    try:
      # パスワードハッシュ化
      passWord_bytes=passWord.encode("utf-8")
      hashed_password=bcrypt.hashpw(passWord_bytes,bcrypt.gensalt())

      # sql登録
      sql=self._sql
      # sql接続確認と開始
      sql.con_exist()
      sql.open_process()

      # 同じユーザー名がいるか？
      if not self._read.isSameNameExists(userName):
        return "sameUserExists"
    
      # if文で閉じられているのでもう１度設定
      sql.open_process()
      sql._cur.execute("insert into py_users(username,password) values(%s,%s)",(userName,hashed_password))
      sql._con.commit()
      return "ok"
    except Exception as e:
      print(e)
      # エラールートへ
      return "error"
    finally:
      sql.close_process()
    
  
# ログインネームとパスワードのチェック
  def check_login(self,userName,passWord):
    sql=self._sql
    # sql接続確認と開始
    sql.con_exist()
    sql.open_process()
    #ハッシュ化されたパスワードを取り出す 
    sql._cur.execute("select password from py_users where username=%s",(userName))
    hashedPassWrod=sql._cur.fetchone()
    # sql終了
    sql.all_close()
    # パスワードのデータがない＝ユーザーネームが存在しない
    if hashedPassWrod is None:
      return False
    
    return bcrypt.checkpw(passWord.encode("UTF-8"), hashedPassWrod[0].encode("UTF-8"))


