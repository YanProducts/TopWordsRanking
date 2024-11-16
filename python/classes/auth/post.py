import bcrypt

# 登録事項関係のpost
class AuthPost:
  def __init__(self,sql,read):
    self._sql=sql
    self._read=read


#  新規登録（変更の場合はtransactionは外部呼び出し）
  def store(self,userName,passWord,useTransaction=True):
    try:
      # パスワードハッシュ化
      passWord_bytes=passWord.encode("utf-8")
      hashed_password=bcrypt.hashpw(passWord_bytes,bcrypt.gensalt())

      # sql登録(既にトランザクション内部にいるかどうかで分ける)
       # 同じユーザー確認の際にトランザクションのselectにも排他ロックをかける
      sql=self._sql
      if(useTransaction):
        # sql接続確認と開始
        sql.con_exist()
        sql.open_process()
        self._sql._con.start_transaction(isolation_level="SERIALIZABLE")
      # 同じユーザー名がいるか？
      if not self._read.isSameNameExists(userName):
        return "sameUserExists"
    
      # if文で閉じられているのでもう１度設定
      sql.open_process()
      sql._cur.execute("insert into py_users(username,password) values(%s,%s)",(userName,hashed_password))
      if(useTransaction):
        self._sql._con.commit()
      return "ok"    
    except Exception as e:
      if(useTransaction):
        self._sql._con.rollback()
      # エラーを返す
      return str(e)
    finally:
      if(useTransaction):
       sql.close_process()
    
  
# ログインネームとパスワードのチェック
  def check_login(self,userName,passWord,app,inProcess=False):
    sql=self._sql
    try:
        # 既にsqlが接続されている場合は省略
        # sql接続確認と開始
      if(inProcess == False):
        sql.con_exist()
        sql.open_process()
      #ハッシュ化されたパスワードを取り出す 
      sql._cur.execute("select password from py_users where username=%s",(userName,))
      hashedPassWrod=sql._cur.fetchone()

      # パスワードのデータがない＝ユーザーネームが存在しない
      if hashedPassWrod is None:
        raise Exception("passWordDataNone")
      return bcrypt.checkpw(passWord.encode("UTF-8"), hashedPassWrod[0].encode("UTF-8"))
    except Exception as e:
      if app.config["ENV_TYPE"]=="local":
        print(e)
      return False
    finally:
      # sql終了
      if(inProcess == False):
        sql.all_close()
    