import './InputEl.css'

export default function InputEl(props) {

  return (
    <div className="form__input-wrapper">
      <div className="form__name">{props.nameForm}</div>
      <label>
        <input className={(props.Dirty && props.Error) ? "input-error" : null } onChange={props.onChange} value={props.value} onBlur={props.onBlur} name={props.name} type={props.type} />
        {(props.Dirty && props.Error) && <div className="error" >{props.Error}</div>}
      </label>
      
      <div className="form__description">{props.description}</div>
  </div>
  )
}