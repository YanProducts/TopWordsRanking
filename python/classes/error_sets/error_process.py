# エラーが生じた時の処理
from flask import render_template

class ErrorProcess:
  @staticmethod
  def error_view(message):
    return render_template("error.html",message=message)