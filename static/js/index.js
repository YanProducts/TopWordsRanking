"use strict"

$(()=>{

  select_setting(author_select, author_input)
  select_setting(source_select, source_input)

  function select_setting(select,input){
    // 過去履歴の筆者と媒体にhidden要素を加える
    // 要素を加えたoptionタグをjquery形式で作成
    const option=$("<option>",
    {
      value:"no_choice",
      text:"選択してください",
      disabled:true,
      selected:true
    })
    $(select).prepend(option);
  
    // 過去履歴から筆者と媒体の挿入
    $(select).change(()=>{
      $(input).val($(select).val())
    });
  }


})