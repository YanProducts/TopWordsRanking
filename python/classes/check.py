import datetime;

class Check:

  def __init__(self,postData):
    
    self._start=datetime.datetime(year=int(postData["detail_start_year"]),month=int(postData["detail_start_month"]),day=int(postData["detail_start_day"]))
    self._end=datetime.datetime(year=int(postData["detail_end_year"]),month=int(postData["detail_end_month"]),day=int(postData["detail_end_day"]))

  def date_check(self):
    return self._start<self._end
    