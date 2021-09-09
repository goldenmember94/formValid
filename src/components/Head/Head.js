import './Head.css'
import React, {useState, useRef} from 'react';

import rectangle from './image/Rectangle2.png';


function Head(props) {
  const [changeStatus, setChangeStatus] = useState(false)
  const [status, setStatus] = useState("Прежде чем действовать, надо понять")
  const [statusInput, setStatusInput] = useState(status)

  const inputEl = useRef(null);

  function changeStatusShow(e) {
    inputEl.current.value = status;
    setChangeStatus(!changeStatus)
  }

  function statusText(e) {
    setStatusInput(e.target.value)
  }

  function statusConfirm() {
    setStatus(statusInput)

    changeStatusShow()
  }

  return (
    <div className="head">

      <div className="head__wrapper-top">
        <div className="head__hello">Здравствуйте, <span>Человек №3596941</span></div>
  
        <div className="head__status" onClick={changeStatusShow}>Сменить статус</div>
        
      </div>

      <div className={changeStatus ? "head__input-status" : "none"}>
        <input ref={inputEl} type="text" onChange={statusText}/> <button onClick={statusConfirm}>OK</button>
      </div>

      <div className="head__wrapper-bottom">
        <img height="11px" width="11px" className="head__img" src={rectangle} alt="#" />
        <div className="head__status-text"> <p> {status} </p> </div>
      </div>
      
    </div>
  )
}

export default Head