from flask import render_template, request
from classes.modules.forms import MyPostForm
from classes.modules.forms import MySelectForm


class Process:

  def __init__(self,jpn,read,post):
    self._jpn=jpn
    self._read=read
    self._post=post


  # リクエストの際の処理
  def request_process(self,request):
    sentsbase=request.get("request_sentences")
    author=request.get("request_author")
    source=request.get("request_source")

    # 解析
    sents=self._jpn.jpn_analyze(sentsbase)

    # 解析した言葉を格納
    self._post.insert_words(sents,author,source)

    # データ挿入後のランキングを返す
    return (sentsbase,author,source,self._read.get_rank("words"),sents)
      

        # 詳細データを返す処理
  def get_detail_results(self,request):

      # 筆者
      author=request.form.get("detail_author")
      # 媒体
      source=request.form.get("detail_source")

      # 日付
      start_year=request.form.get("detail_start_year")
      start_month=request.form.get("detail_start_month")
      start_day=request.form.get("detail_start_day")
      end_year=request.form.get("detail_end_year")
      end_month=request.form.get("detail_end_month")
      end_day=request.form.get("detail_end_day")

      # sql比較型に直す
      start_date_str=f"{start_year}-{start_month}-{start_day}"
      end_date_str=f"{end_year}-{end_month}-{end_day}"
      
      # # 条件に合うリクエスト取得
      return self._read.get_filteredRank(author,source,start_date_str,end_date_str)