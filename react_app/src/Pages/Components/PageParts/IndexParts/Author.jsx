import { ValidationErrorComponent } from "./ValidationError"

export const AuthorComponent=({author,error,authorOptions,onAuthorInputChange,onAuthorSelectChange,AuthorInputRef})=>{
  return(
    <>
      <div className="base_inputAndOption_div">
        <div className="base_spanInInputSes_div">
        <span>筆者</span>
        </div>
        <input ref={AuthorInputRef} className="w-2/5  min-w-[100px]" onChange={onAuthorInputChange} value={author}/>
        <select className="w-2/5 min-w-[100px]" onChange={onAuthorSelectChange}>
          {authorOptions}
        </select>
      </div>
      <ValidationErrorComponent content="request_author" error={error}/>
    </>
  )}