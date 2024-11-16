from flask import Flask, send_from_directory,session,jsonify, request
from flask_session import Session
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
from classes.auth.read import AuthRead
from classes.auth.post import AuthPost
from classes.auth.patch import AuthPatch
from classes.error_sets.custom_error import InvalidColumnError,SqlError
from classes.error_sets.error_process import ErrorProcess
import bcrypt
import os

app=Flask(__name__,static_folder="../react_app/build")
CORS(app)

#  設定のインポート
app.config.from_object(Config)

# sessionのためのsecretkeyの作成(csrfに使用)
app.secret_key=app.config["SESSION_SECRET_KEY"]

Session(app)  # Flask-Session の初期化

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
# これは本番環境のnpm run buildで必要
# @app.route("/",defaults={"path":"index"})
# def catch_all(path):
#   # 一律でindex.htmlへ
#   return send_from_directory(app.static_folder,"index.html")


# ログインの確認ルート
@app.route("/auth/loginSessionCheck")
@csrf.exempt
def sessionCheck():
  sql=Sql()
  authRead=AuthRead(sql)
  if not authRead.userExistsCheck(session):
         return jsonify({
            "loginOk":False
         })
  else:
        return jsonify({
          "loginOk":True,
          "loginname":session.get("userName")
          })

# ログインのルート(初期変数=CSRF)受け渡し
@app.route("/api/auth/login_first_data",methods=["POST"])
@csrf.exempt
def loginFirstSetting():
  # データ取得
  default_data=request.get_json()
  # 不正なアクセス対策
  default_pass=default_data.get("defaultPass")
  fromURL=default_data.get("fromURL")  # ユーザーネームのリスト

  # 不正なアクセスエラーをjsonで返す！
  if not fromURL or not fromURL=="/auth/login" or default_pass != app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400

  # tokenの作成
  token=generate_csrf()

  # 登録されている全ユーザーを返す
  sql=Sql()
  authRead=AuthRead(sql)
  existedUsers=authRead.getAllUsers()

  # 返す
  return jsonify({
    "token":token,
    "env_type":app.config["ENV_TYPE"],
    "existedUsers":existedUsers
  })

# ログインのルート(送信)
@app.route("/api/auth/login",methods=["POST"])
def loginPost():
  postData=request.get_json()
  sql=Sql()
  read=AuthRead(sql)
  post=AuthPost(sql,read)
  # 存在と一致の確認
  isOk=post.check_login(postData["userName"],postData["passWord"],app)
  if(isOk):
    # sessionの登録
    session["userName"]=postData["userName"]
  # 正否の返却
  return jsonify({"loginOk":isOk})


# ログアウトのルート
@app.route("/api/auth/logout")
def logout():
  # 直接の時も同様にこれ
  session.pop("userName",None)
  return jsonify({
    "logoutOk":"ok"
  })

# 新規作成のルート(初期設定)
@app.route("/api/auth/register_first_data", methods=["POST"])
@csrf.exempt
def registerFirstSetting():
  # トークンを渡す
  token = generate_csrf()  
  # 返す
  return jsonify({
    "token":token,
    "env_type":app.config["ENV_TYPE"]
  })


# 新規作成のルート(送信)
@app.route("/api/auth/register", methods=["POST"])
def registerPost():

  postData=request.get_json()
  sql=Sql()
  read=AuthRead(sql)
  post=AuthPost(sql,read)
  # 成功しても失敗してもいずれもメッセージを返す
  message=post.store(postData["userName"],postData["passWord"])

  return jsonify({"message":message})


# 登録内容変更初期設定
@app.route("/api/auth/dataChange_first_data",methods=["POST"])
@csrf.exempt
def dataChangeFirstSetting():
  data=request.get_json()
  if not data.get("fromURL") or data.get("fromURL") != "/auth/dataChange":
    return jsonify({"error":"不正なアクセスです"}),400
  # トークンを渡す
  token = generate_csrf()  
  return jsonify(
    {
      "token":token,
      "env_type":app.config["ENV_TYPE"]
      }
  )

# 登録内容変更：以前の登録者チェック
@app.route("/api/auth/dataChangeRegisterCheck",methods=["POST"])
def registerCheck():
  postData=request.get_json()
  sql=Sql()
  read=AuthRead(sql)
  post=AuthPost(sql,read)
  isOk=post.check_login(postData["userName"],postData["passWord"],app)
  return jsonify({
    "isOk":isOk
  })



# 登録内容変更送信
@app.route("/api/auth/dataChange", methods=["POST"])
def dataChangePost():
  postData=request.get_json()
  sql=Sql()
  read=AuthRead(sql)
  post=AuthPost(sql,read)
  patch=AuthPatch(sql,read,post)
  # 既に新規入力項目の条件はブラウザ側で設定済み

  # キーの取得(ない場合はエラー)
  keys=["choice","oldUserName","oldPassWord","newLoginField"]
  try:
    choice,oldUserName,oldPassWord,newLoginField=(postData[key] for key in keys)
  except:
    return jsonify({"message":"keyError"})
  print(choice)
  # 登録内容変更のプロセス
  if choice=="userName":
    message=patch.update_userName(oldUserName,oldPassWord,newLoginField,app)
  elif choice=="passWord":
    message=patch.update_passWord(oldUserName,oldPassWord,newLoginField,app)
  else:
    message="choiceValueError"
  print(message)
  return jsonify({"message":message});


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
  if not fromURL or not fromURL=="index" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400

  # インスタンスの宣言&sql接続
  sql=Sql()
  # トークンを渡す
  token = generate_csrf()
  myselectForm=MySelectForm(session.get("userName"))

  # これまでのデータ取得
  existedAuthors = {i: value[0] for i, value in enumerate(myselectForm._authors_choices)}  
  existedSources = {i: value[0] for i, value in enumerate(myselectForm._sources_choices)}

  # sql終了
  sql.close_process()

  return jsonify({
    "token":token,
    "isIndex":True,
    "authors":existedAuthors,
    "sources":existedSources,
    "userName":session.get("userName"),
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
  if not fromURL or not fromURL== "detail/main" or not default_pass == app.config["DEFAULT_PASS"]:
    return jsonify({"error":"不正なアクセスです"}),400
  
  # tokenの設定
  token = generate_csrf()

  defaultData={**process.get_detail_defaults(session.get("userName")),"userName":session.get("userName"),"token":token,"env_type":app.config["ENV_TYPE"]}

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
