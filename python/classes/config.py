# 設定用のクラス
# app.config.from_object()で呼び出す

class Config:
  # sql
  HOST="localhost"
  DATABASE="onlyforstudy"
  DBUSER="root"
  DBPASS="Minority0417/"
  
  # デバック系統
  DEBUG_MODE=True
  USE_PORT=5001
  USE_HOST='127.0.0.1'

  # ローカルか本番か
  ENV_TYPE="local"

  # 初期状態の変数キー
  DEFAULT_PASS="Mino1123/Mino77"

  # csrfトークンに必要なキー
  SECRET_KEY="CSRF_KEY"