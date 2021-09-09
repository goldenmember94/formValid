import './SelectEl.css'

export default function SelectEl(props) {

  return (

    <div className="form__input-wrapper">
      <div className="form__name">Ваш город</div>

      <select onChange={props.selectCity} className="select-option__wrapper"  >

        {props.cityListSorted 
        ? props.cityListSorted.map((i, index) => 
          
          <option 
            className="select-option__item" 
            value={i.city} 
            key={index} 
          >{i.city}</option>
        ) 
        : <option></option>}

      </select>

    </div>
  )
}