# sqlセットアップ
from flask import Flask
from classes.config import Config
import mysql.connector as sql
from classes.error_sets.custom_error import SqlError

# config変数の呼び出しのために必要
app=Flask(__name__)
app.config.from_object(Config)

class Sql:
  
  # 初期化
  def __init__(self):
    try:
      self._con=sql.connect(
      port="3306",
      host=app.config['HOST'],
      database=app.config['DATABASE'],
      user=app.config['DBUSER'],
      password=app.config['DBPASS']
    )
    except Exception as e:
      # raise SqlError("構築でのエラーです")
      raise SqlError(e)
    # 開けたり閉じたりするので、ここでは操作しない
    self._cur=""    
 
  # 開始時
  def open_process(self):
    self._cur=self._con.cursor()

  # sql接続確認
  def con_exist(self):
    try:
      self._con.ping(reconnect=True) 
    except Exception as e:
      # raise SqlError("接続できていません")
      raise SqlError(e)


  # 終了時
  def close_process(self):
    if(self._cur):
      self._cur.close()
      self._cur=None
  

 # 完全終了時
  def all_close(self):
    self.close_process()
    self._con.close()
    self._con=None







