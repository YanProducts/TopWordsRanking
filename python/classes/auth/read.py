import bcrypt
import os
from classes.error_sets.custom_error import SqlError

# 登録事項関係のread
class AuthRead:
   def __init__(self,sql):
    self._sql=sql

   # 全ユーザーを返す
   def getAllUsers(self):
    sql=self._sql
    sql.con_exist()
    sql.open_process()
    sql._cur.execute("select username from py_users")
    existtedUsers=sql._cur.fetchall()
    sql.close_process()
    return existtedUsers
    
  # 同じユーザー名のユーザーがいるか？
   def isSameNameExists(self,userName):
    sql=self._sql
    # 呼び出し元で行なっているのでopenは省略
    sql._cur.execute("select * from py_users where username=%s", (userName,))
    isUserExists=sql._cur.fetchone()
    sql.close_process()
    if isUserExists is None:
       return True
    else:
       return False
    
   #  ログインしているか、ログインユーザーは存在するか
   def userExistsCheck(self,session):
       # sessionにusernameがある場合
      if("userName" in session):
         # 現在のuserNameの取得
         now_user = session.get("userName")
         # 全てのsessionを1度消す
         session.clear()
         # sessionのidの変更（ハイジャック防止）
         session['session_id'] = os.urandom(16).hex()
         # 新たなユーザーネームの作成
         session["userName"]=now_user
         return True
      else:
         session.clear()
         return False