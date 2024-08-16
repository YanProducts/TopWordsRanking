import spacy

class Ginza:
  # staticで行けそうだが、変数統一と今後のため一般メソッドに
  def jpn_analyze(self,sentenses):
    nlp=spacy.load("ja_ginza")
    doc=nlp(sentenses)

    now_ginza_lists=[]
    for sent in doc.sents:
      for token in sent:
        now_ginza_lists.append(token.orth_)

    return now_ginza_lists
  

