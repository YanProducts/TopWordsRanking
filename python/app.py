from flask import Flask, send_from_directory,jsonify,render_template, request
# jsxからのアクセスを許可する
from flask_cors import CORS
# flaskのcsrf対策
from flask_wtf.csrf import CSRFProtect,CSRFError,generate_csrf
# クラスをインポート
from classes.config import Config
from classes.modules.sql import Sql
from classes.modules.sass import Sass
from classes.modules.ginza import Ginza
from classes.modules.forms import MyPostForm
from classes.modules.forms import MySelectForm
from classes.modules.forms import DetailForm
from classes.process import Process
from classes.read import Read
from classes.post import Post
from classes.error_sets.custom_error import InvalidColumnError,SqlError
from classes.error_sets.error_process import ErrorProcess

import sys

# まだこのstatic_url_pathが理解できてない
app=Flask(__name__,static_folder="../react_app/build", static_url_path="/")
CORS(app)

#  設定のインポート
app.config.from_object(Config)

# csrfトークンの作成
csrf=CSRFProtect(app)
csrf.init_app(app)
# CSRFトークンアウトの際の処理
@app.errorhandler(CSRFError)
def whenCSRFError(e):
  response=jsonify({
    "error":"不正な処理です"
  })
  # CSRF設定を410番に定義
  response.status_code=410
  return response


# # エラーが生じた時の呼び出し
# app.register_error_handler(InvalidColumnError,ErrorProcess.error_view)
# app.register_error_handler(SqlError,ErrorProcess.error_view)

# 全体のページのルーティング
@app.route("/",defaults={"path":"index"})
def catch_all(path):
  return send_from_directory(app.static_folder,"index.html")


# 初期段階での変数設定。jsx側からfetchで行われる
@app.route("/api/first_data",methods=["POST"])
def get_data_forAPI():

  # 不正なアクセス対策
  default_data=request.get_json()
  default_pass=default_data.get("defaultPass")
  fromURL=default_data.get("fromURL")

  # 不正なアクセスエラーをjsonで返す！
  if not fromURL or not "fromIndex" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400

  # インスタンスの宣言&sql接続
  sql=Sql()
  # トークンを渡す
  token=generate_csrf()
     # これまでのデータ取得
  existedAuthors = {i: value[0] for i, value in enumerate(MySelectForm.author_choices)}
  existedSources = {i: value[0] for i, value in enumerate(MySelectForm.source_choices)}

  # sql終了
  sql.close_process()

  return jsonify({
    "token":token,
    "isIndex":True,
    "authors":existedAuthors,
    "sources":existedSources,
    "env_type":app.config["ENV_TYPE"]
    })

# 特定のfunctionをcsrfを無効化(APIのため)
csrf.exempt(get_data_forAPI)


# ポスト時(fetchで操作)
@app.route("/api/post_data",methods=["POST"])
def when_post():

  # tokenの検証とバリデーションは必要

  # インスタンスの宣言 & sql有効化
  sql=Sql()
  read=Read(sql)
  post=Post(sql)
  jpn=Ginza()
  selectFormSets=MySelectForm()
  process=Process(jpn,read,post)

  # データの受け取り
  postData=request.get_json()

  # flaskFormを呼び出す
  form=MyPostForm(data=postData)

  # バリデーション
  # どこかで引っ掛かってる
  if not form.validate():
    # バリデーションリターンは400エラー
    return jsonify({"allErrors":form.errors}),400


  # 問題なければ登録
  sentence,author,source,now_rank,now_ginza_sets=process.request_process(postData)

  # # sql終了
  sql.close_process()
  return jsonify({"rank":now_rank,"author":author,"sentence":sentence,"source":source,"now_ginza_sets":now_ginza_sets})



# 詳細事項
@app.route("/detail")
def detail_view():
  Sass.compile()
  detailFormSets=DetailForm()
  return render_template("details/main.html",form=detailFormSets)


# 詳細情報の投稿
@app.route("/detail_each", methods=["POST"])
def detail_each():
  sql=Sql()
  read=Read(sql)
  post=Post(sql)
  jpn=Ginza()
  process=Process(jpn,read,post)

  # バリデーション(この場合、selectBox以外のものが挿入されているか)
  detailFormSets=DetailForm()
  if not detailFormSets.validate_on_submit():
    return render_template("details/main.html", form=detailFormSets)

  applicatedData=process.get_detail_results(request)

  return render_template("details/result.html", applicatedDataForView=applicatedData)


if __name__=="__main__":
  #  設定のインポート
  app.run(debug=app.config["DEBUG_MODE"],host=app.config["USE_HOST"], port=app.config["USE_PORT"])
