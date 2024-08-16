# sqlの更新
from classes.error_sets.custom_error import SqlError

class Post:
  def __init__(self,sql):
    self._sql=sql
  
    # 単語の挿入
  def insert_words(self,sentences,author,source):
    sql=self._sql
    sql.con_exist()
    # データが存在し、かつrequest_wordと同じ時はカウントをプラス
    try:
      sql.open_process()
      for word in sentences:
        sql._cur.execute("insert into py_access(words,author,source) values(%s, %s, %s)",(word, author, source))
        sql._con.commit()
    except Exception as e:
      sql.all_close()
      # raise SqlError("投稿処理のエラーです")
      raise SqlError(e)
    finally:
      sql.close_process()
  