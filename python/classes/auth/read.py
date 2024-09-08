import bcrypt

# 登録事項関係のread
class AuthRead:
   def __init__(self,sql):
    self._sql=sql
    
  # 同じユーザー名のユーザーがいるか？
   def isSameNameExists(self,userName):
    sql=self._sql
    # 呼び出し元で行なっているので省略
    # sql.con_exist()
    # sql.open_process()
    sql._cur.execute("select * from py_users where username=%s", (userName,))
    isUserExists=sql._cur.fetchone()
    sql.close_process()
    if isUserExists is None:
       return True
    else:
       return False

