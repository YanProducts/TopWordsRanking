# flaskとwtformsを繋ぐ
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, Length, AnyOf

# モジュール
from classes.modules.sql import Sql
from classes.read import Read

# 月日のモジュール
import datetime

class MyPostForm(FlaskForm):
  # post投稿
  # バリデーション必要
  request_sentences=TextAreaField(validators=[DataRequired(message="文面は入力必須です"),Length(max=10000, min=5, message="文面は5文字以上10000字以内です")])

  request_author=StringField(validators=[DataRequired(message="筆者名は必須です"),Length(max=100, message="筆者名は100文字以内")])
  
  request_source=StringField(validators=[DataRequired(message="媒体は必須です"),Length(max=100, message="媒体名は100文字以内")])


# 自分が投稿したデータの取得(初期表示と詳細に共通)
class GettingMyData(FlaskForm):
  def __init__(self,userName):
    # FlaskFormを引き継ぐ
    super().__init__()
    self._sql=Sql()
    self._read=Read(self._sql)  
    self._userName=userName
  # 過去のデータの取得
  def getting_authors_choices(self):
    return [(r["author"],r["author"])for r in self._read.get_rank("author",self._userName)]
  def getting_sources_choices(self):   
    return [(r["source"],r["source"])for r in self._read.get_rank("source",self._userName)]
  

class MySelectForm(FlaskForm):
  # 候補をフォームに挿入
  # バリデーション不要

  # FlaskFormは全体で定義
  # authors_selects=SelectField("筆者",choices="")
  # sources_selects=SelectField("筆者",choices="")

  # インスタンス化した際に、それぞれのChoicesの中身を入れる
  def __init__(self,userName):
    super().__init__()
    self._userName=userName
    self._gettingMyData=GettingMyData(self._userName)
    self._authors_choices=self._gettingMyData.getting_authors_choices()
    self._sources_choices=self._gettingMyData.getting_authors_choices()
    # self.authors_selects.choices=self._authors_choices
    # self.sources_selects.choices=self._sources_choices



# 詳細分析
class DetailForm(FlaskForm):

  def getting_detail_authors(userName):
    gettingMyData=GettingMyData(userName)
    return SelectField(id="detail",validators=[AnyOf(gettingMyData.getting_authors_choices())],choices=gettingMyData.getting_authors_choices())
 
  def getting_detail_sources(userName):
    gettingMyData=GettingMyData(userName)
    return SelectField(id="detail",validators=[AnyOf(gettingMyData.getting_sources_choices())],choices=gettingMyData.getting_sources_choices())
  
  detail_start_year=SelectField(id="detailStartYearRequest", validators=[AnyOf([str(n) for n in range(2020, datetime.datetime.now().year+1)])],choices=[str(n) for n in range(2020, datetime.datetime.now().year+1)])

  detail_start_month=SelectField(id="detailStartMonthRequest",validators=[AnyOf([str(n) for n in range(1, 13)])],choices=[str(n) for n in range(1, 13)])

  detail_start_day=SelectField(id="detailStartDayRequest",validators=[AnyOf([str(n) for n in range(1, 32)])],choices=[str(n) for n in range(1, 32)])


  detail_end_year=SelectField(id="detailEndYearRequest", validators=[AnyOf([str(n) for n in range(2020, datetime.datetime.now().year+1)])],choices=[str(n) for n in range(2020, datetime.datetime.now().year+1)])

  detail_end_month=SelectField(id="detailEndMonthRequest", validators=[AnyOf([str(n) for n in range(1, 13)])],choices=[str(n) for n in range(1, 13)])
  
  detail_end_day=SelectField(id="detailEndDayRequest", validators=[AnyOf([str(n) for n in range(1, 32)])],choices=[str(n) for n in range(1, 32)])