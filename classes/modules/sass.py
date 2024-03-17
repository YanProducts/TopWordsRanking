import sass

class Sass:
  @staticmethod
  def compile():
    css_pass="static/css/styles.css"
    sass_pass="static/scss/index.scss"

    sass_output=sass.compile(filename=sass_pass)

    with open(css_pass,"w") as f:
      f.write(sass_output)
  