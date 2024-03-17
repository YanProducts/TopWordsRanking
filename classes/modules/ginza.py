import spacy

class Ginza:
  # staticで行けそうだが、変数統一と今後のため一般メソッドに
  def jpn_analyze(self,sentenses):
    nlp=spacy.load("ja_ginza")
    doc=nlp(sentenses)
    return doc.sents