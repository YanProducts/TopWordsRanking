from flask import Flask, send_from_directory,jsonify, request,session
# jsxからのアクセスを許可する
from flask_cors import CORS
# flaskのcsrf対策
from flask_wtf.csrf import CSRFProtect,CSRFError,generate_csrf
# クラスをインポート
from classes.config import Config
from classes.modules.sql import Sql
from classes.modules.ginza import Ginza
from classes.modules.forms import MyPostForm
from classes.modules.forms import MySelectForm
from classes.modules.forms import DetailForm
from classes.process import Process
from classes.read import Read
from classes.post import Post
from classes.check import Check

from classes.error_sets.custom_error import InvalidColumnError,SqlError
from classes.error_sets.error_process import ErrorProcess

app=Flask(__name__,static_folder="../react_app/build")
CORS(app)

#  設定のインポート
app.config.from_object(Config)

# sessionのためのsecretkeyの作成
app.secret_key=app.config["SESSION_SECRET_KEY"]

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


# 全体のページのルーティング
@app.route("/",defaults={"path":"index"})
def catch_all(path):
  return send_from_directory(app.static_folder,"index.html")

# ログインのルート(表示)
@app.route("/auth/login")
def login():
  print("a")

# ログインのルート(初期変数=CSRF)受け渡し
@app.route("api/login_first_data",method=["POST"])
@csrf.exempt
def login():
  # データ取得
  default_data=request.get_json()
  # 不正なアクセス対策
  default_pass=default_data.get("defaultPass")
  fromURL=default_data.get("fromURL")  # ユーザーネームのリスト
  # 不正なアクセスエラーをjsonで返す！
  if not fromURL or not fromURL=="fromLogin" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400
  
  # トークンを渡す
  if '_csrf_token' not in session:
    session['_csrf_token'] = generate_csrf()

  # 返す
  return jsonify({
    "token":session["_csrf_token"],
    "existedUser":["a","b","c"]
    })

# ログインのルート(送信)
@app.route("/api/auth/login",methods=["POST"])
def login():
  print("b")


# 新規作成のルート(表示)
@app.route("/auth/register")
def register():
  print("a")

# 新規作成のルート(送信)
@app.route("/api/auth/register", method=["POST"])
def register():
  print("a")


# パスワードチェンジのルート(表示)
@app.route("/auth/passchange")
# パスワードチェンジのルート(送信)
@app.route("/api/auth/passchange", method=["POST"])


# 初期段階での変数設定。jsx側からfetchで行われる
@app.route("/api/first_data",methods=["POST"])
# csrf無効化
@csrf.exempt
def get_data_forAPI():
  
  # データ取得
  default_data=request.get_json()

  # 不正なアクセス対策
  default_pass=default_data.get("defaultPass")
  fromURL=default_data.get("fromURL")

  # 不正なアクセスエラーをjsonで返す！
  if not fromURL or not fromURL=="fromIndex" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400

  # インスタンスの宣言&sql接続
  sql=Sql()
  # トークンを渡す
  if '_csrf_token' not in session:
    session['_csrf_token'] = generate_csrf()
     # これまでのデータ取得
  existedAuthors = {i: value[0] for i, value in enumerate(MySelectForm.author_choices)}
  existedSources = {i: value[0] for i, value in enumerate(MySelectForm.source_choices)}

  # sql終了
  sql.close_process()

  return jsonify({
    "token":session['_csrf_token'],
    "isIndex":True,
    "authors":existedAuthors,
    "sources":existedSources,
    "env_type":app.config["ENV_TYPE"]
    })




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


# 詳細事項の初期情報取得
@app.route("/api/detail_first_data",methods=["POST"])
# csrf無効化
@csrf.exempt
def detail_view():
  sql=Sql()
  read=Read(sql)
  post=Post(sql)
  jpn=Ginza()
  process=Process(jpn,read,post)
  
  # データ取得
  default_data=request.get_json()

  # 不正なアクセス対策
  default_pass=default_data.get("defaultPass")
  fromURL=default_data.get("fromURL")

  # 不正なアクセスエラーをjsonで返す！
  if not fromURL or not fromURL== "main" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400
  
  # tokenの設定
  if '_csrf_token' not in session:
    session['_csrf_token'] = generate_csrf()

  defaultData={**process.get_detail_defaults(),"token":session['_csrf_token'],"env_type":app.config["ENV_TYPE"]}

  return jsonify(defaultData)


# 詳細事項の投稿
@app.route("/api/detail_each",methods=["POST"])

def detail_each():
#  データの受け取りと変更
 postData=request.get_json()

 #バリデーション
 form=DetailForm(data=postData)
 if not form.validate():
   return jsonify({"allErrors":form.errors}),400

 #月日の以前以後がおかしいとき
 #月日のclass取得
 check=Check(postData)
 if not check.date_check():
   return jsonify({"allErrors":"dateError"}),422

 #条件解析

 #合うものをreturn
 return jsonify({"a":"aaaa"})



if __name__=="__main__":
  #  設定のインポート
  app.run(debug=app.config["DEBUG_MODE"],host=app.config["USE_HOST"], port=app.config["USE_PORT"])
