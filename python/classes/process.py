from flask import render_template, request
from classes.modules.forms import MyPostForm
from classes.modules.forms import MySelectForm
from datetime import datetime


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
  def get_detail_defaults(self):

      # 筆者
      authors_choices=[r["author"] for r in self._read.get_rank("author")]
      
      # 媒体
      sources_choices=[r["source"] for r in self._read.get_rank("source")]
    
      # 日付(開始も終了も、この段階では同じ)
      default_year_sets=[n for n in range(2020, datetime.now().year+1)]
      default_month_sets=[n for n in range(1, 13)]
      default_day_sets=[n for n in range(1, 32)]

      return{
       "authors":authors_choices,
       "sources":sources_choices,
       "years":default_year_sets,
       "months":default_month_sets,
       "days":default_day_sets,
      }



        # 詳細データを返す処理
  def get_detail_base(self,request):
     return "a"
      # request取得

      # sql比較型に直す
      # start_date_str=f"{start_year}-{start_month}-{start_day}"
      # end_date_str=f"{end_year}-{end_month}-{end_day}"

      # # # 条件に合うリクエスト取得
      # return self._read.get_filteredRank(author,source,start_date_str,end_date_str)