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
  

class MySelectForm(FlaskForm):
  # 候補をフォームに挿入
  # バリデーション不要
  sql=Sql()
  read=Read(sql)
  author_choices=[(r["author"],r["author"])for r in read.get_rank("author")]
  source_choices=[(r["source"],r["source"])for r in read.get_rank("source")]
  
  author_select=SelectField("筆者",choices=author_choices,  id="author_select")
  source_select=SelectField("媒体",choices=source_choices, id="source_select")


# 詳細分析
class DetailForm(FlaskForm):


  sql=Sql()
  read=Read(sql)

  author_choices=[r["author"] for r in read.get_rank("author")]
  source_choices=[r["source"] for r in read.get_rank("source")]

  detail_author=SelectField(id="detail",validators=[AnyOf(author_choices)])
  detail_source=SelectField(id="detail",validators=[AnyOf(source_choices)])
  
  detail_start_year=SelectField(id="detailStartYearRequest", validators=[AnyOf([str(n) for n in range(2024, datetime.datetime.now().year+1)])])

  detail_start_month=SelectField(id="detailStartMonthRequest",validators=[AnyOf([str(n) for n in range(1, 13)])])

  detail_start_day=SelectField(id="detailStartDayRequest",validators=[AnyOf([str(n) for n in range(1, 32)])])


  detail_end_year=SelectField(id="detailEndYearRequest", validators=[AnyOf([str(n) for n in range(2020, datetime.datetime.now().year+1)])])

  detail_end_month=SelectField(id="detailEndMonthRequest", validators=[AnyOf([str(n) for n in range(1, 13)])])
  
  detail_end_day=SelectField(id="detailEndDayRequest", validators=[AnyOf([str(n) for n in range(1, 32)])])