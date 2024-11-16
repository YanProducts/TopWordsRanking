# ハッシュ化のモジュール
import bcrypt

# データの変更
class AuthPatch:

  def __init__(self,sql,read,post):
    self._sql=sql
    self._read=read
    self._post=post


  # ユーザーネームの変更
  def update_userName(self,oldUserName,oldPassWord,newUserName,app):
    # sql接続してコネクター取得
    conn=self._sql._con
    self._sql.open_process()
    try:
      # トランザクション
      conn.start_transaction(isolation_level="SERIALIZABLE")

     #  元のパスワード確認
      if not self._post.check_login(oldUserName,oldPassWord,app,True):
        raise Exception("oldPassUnMatch")

     # ユーザーの追加(既に登録済みの場合などが返る)
     # 最後の引数はtransaction内部にいるかどうか 
      userAdd=self._post.store(newUserName,oldPassWord,False)
      if userAdd != "ok":
        raise Exception(userAdd)

     #データテーブルの変更
      self._sql._cur.execute("update py_access set userName=%s where userName=%s", [newUserName,oldUserName])

     #元ユーザーの消去   
      self._sql._cur.execute("delete from py_users where userName=%s", [oldUserName])

      conn.commit()  
      return "ok"
    except Exception as e:
      conn.rollback()
      return str(e)
    
    finally:
      self._sql.all_close()

    # パスワードの変更
  def update_passWord(self,oldUserName,oldPassWord,newPassWord,app):
    # sql接続してコネクター取得
    conn=self._sql._con
    self._sql.open_process()
    try:
      # トランザクション
      conn.start_transaction()
     #  元のパスワード確認
      if not self._post.check_login(oldUserName,oldPassWord,app,True):
        raise Exception("oldPassUnMatch")
      # パスワードハッシュ化
      passWord_bytes=newPassWord.encode("utf-8")
      hashed_password=bcrypt.hashpw(passWord_bytes,bcrypt.gensalt())
      # パスワード変更
      self._sql._cur.execute("update py_users set passWord=%s where userName=%s",(hashed_password,oldUserName))
      conn.commit()
      return "ok"
    except Exception as e:
      conn.rollback()
      # エラーを返す
      print(str(e))
      return str(e)
    finally:
      self._sql.all_close()

