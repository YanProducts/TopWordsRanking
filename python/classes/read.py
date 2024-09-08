# sqlから情報を読み取る
from classes.error_sets.custom_error import InvalidColumnError,SqlError

class Read:
  def __init__(self,sql):
    self._sql=sql

  # ランキングの取得(カラム別)
  def get_rank(self,what):
    sql=self._sql
    sql.con_exist()
    allowed_columns=["author","source","words"]
    if not what in allowed_columns:
      sql.all_close()
      raise InvalidColumnError("カラム名が異常です")

    try:
      sql.open_process()
      sql._cur.execute("select %s, count(*) as c from py_access group by %s order by c desc",(what,what))    
      rank=[{what:r[0], "c":r[1]} for r in sql._cur.fetchall()]
      if rank:
        rank=self.rank_change(rank)
      return rank
    except Exception as e:
      sql.all_close()
      # raise SqlError("データ取得のエラーです")
      raise SqlError(e)

    finally:
      sql.close_process()

  # ランキングの取得（詳細条件別）
  def get_filteredRank(self,author,source,start_date_str,end_date_str):
    sql=self._sql
    sql.open_process()
    try:
      sql._cur.execute("select words, count(*) as c from py_access where author=%s and source=%s and date >=%s and date<=%s group by words order by c desc",(author,source,start_date_str,end_date_str))
      rank=[{"words":r[0],"c":r[1]} for r in sql._cur.fetchall()]
      if not rank:
        return ""
      else:
        # ここまでOK
        rank=self.rank_change(rank)
      return rank
    except Exception as e:
      sql.all_close()
      # raise SqlError("データ取得のエラーです")
      raise SqlError(e)
    finally:
      sql.close_process()
    


  # ランキング形式に直す
  def rank_change(self,rank):
    
    before_c=""
    default_rank=0
    before_rank=1

    for r in rank:
    # # before_cが設定されていない、もしくは前の数と違うなら順位を加算
      if before_c != r["c"]:
        r["number"]=default_rank + 1
        # 前のカウントを更新
        before_c=r["c"]
        # 前の順位を更新
        before_rank=r["number"]
      else:
        r["number"]=before_rank
        # 必然的に前のカウントはそのまま、前の順位もそのまま
      r["id"]=default_rank
      default_rank += 1
    return rank
    
    