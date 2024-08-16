# カスタム定義のエラー

# カラムの定義が違う時
class InvalidColumnError(Exception):
  pass

# sql内部のエラー
class SqlError(Exception):
  pass

