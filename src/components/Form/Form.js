import './Form.css'
import React, {useState, useEffect} from 'react';

import {regEmail, linkCityListData} from '../../variables'
import {} from '../../helpers'
import SelectEl from '../Select/SelectEl';
import LineEl from '../LineEl/LineEl';
import InputEl from '../InputEl/InputEl';


function Form() {

  const [cityList, setCityList] = useState(false)
  const [cityListSorted, setCityListSorted] = useState(false)

  const [time, setTime] = useState('15 мая 2012 в 14:55:17')
  const [city, setCity] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordDirty2, setPasswordDirty2] = useState(false)
  const [emailError, setEmailError] = useState('Укажите E-mail')
  const [passwordError, setPasswordError] = useState('Укажите пароль')
  const [passwordError2, setPasswordError2] = useState('Укажите пароль')
  const [formValid, setFormValid] = useState(false)
  const [mailing, setMailing] = useState(false)

  useEffect(() => {

    if (emailError || passwordError || passwordError2) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }

  }, [emailError, passwordError, passwordError2])

  useEffect(() => {
    if (!cityList) {
      fetch(linkCityListData)
      .then(response => response.json())
      .then(json => setCityList(json))
    }
  })

  useEffect(() => {
    if (cityList) {
      let cityListNew = []
      let maxSity = {population: 0}

      cityList.forEach((item) => {

        if (Number(item.population) > 50000) {

          cityListNew.push(item)

          if (maxSity.population < Number(item.population)) {
            maxSity = item
          }
          
        }

      })

      cityListNew.sort()
      const maxCityIndex = cityListNew.findIndex(item => item.population === maxSity.population)
      cityListNew.splice(maxCityIndex, 1)
      cityListNew.unshift(maxSity)
      setCityListSorted(cityListNew)
      setCity(cityListNew[0].city)
    }
  }, [cityList])

  function selectCity(e) {
    setCity(e.target.value)
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    if(!regEmail.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Неверный E-mail')
    } else {
      setEmailError('')
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)

    if (e.target.value.length < 5) {
      setPasswordError('Используйте не менее 5 символов')
      if(!e.target.value) {
        setPasswordError('Укажите пароль')
      }
    } else {
      setPasswordError('')
    }

    if (password2 === e.target.value) {
      setPasswordError2('')
    } else {
      setPasswordError2('Пароли не совпадают')
    }

  }

  const passwordHandler2 = (e) => {
    setPassword2(e.target.value)

    if (e.target.value.length < 5) {
      setPasswordError2('Используйте не менее 5 символов')

      if(!e.target.value) {
        setPasswordError2('Укажите пароль')
      }
    } else {
      setPasswordError2('')
    }

    if (password !== e.target.value) {
      setPasswordError2('Пароли не совпадают')
      if(!e.target.value) {
        setPasswordError2('Укажите пароль')
      }
    }

  }

  function blurHandler(e) {
    switch(e.target.name) {

      case 'password':
        setPasswordDirty(true)
        break

      case 'password2':
        setPasswordDirty2(true)
        break

      case 'email':
        setEmailDirty(true)
        break

      default:
        
    }
  }

  function submitData(e) {

    e.preventDefault()

    let dataFormSend = {
      city,
      email,
      password,
      mailing,
    }

    setTime(String(Date()))

    console.log(JSON.stringify(dataFormSend));
  }

  function mailingData() {
    setMailing(!mailing)
  }

  return (
    <form className="form">

      <SelectEl 
        selectCity={selectCity}
        cityListSorted={cityListSorted}
      />

      <LineEl/>

      <InputEl
        nameForm="Пароль"
        description="Ваш новый пароль должен содержать не менее 5 символов."
        name="password"
        type="password"
        value={password}
        Dirty={passwordDirty}
        Error={passwordError}
        onChange={passwordHandler}
        onBlur={blurHandler}
      />

      <InputEl
        nameForm="Пароль еще раз"
        description="Повторите пароль, пожалуйста, это обезопасить вас с нами на случай ошибки."
        name="password2"
        type="password"
        value={password2}
        Dirty={passwordDirty2}
        Error={passwordError2}
        onChange={passwordHandler2}
        onBlur={blurHandler}
      />

      <LineEl/>

      <InputEl
        nameForm="Электронная почта"
        description="Можно изменить адрес, указанный при регистрации."
        name="email"
        type="text"
        value={email}
        Dirty={emailDirty}
        Error={emailError}
        onChange={emailHandler}
        onBlur={blurHandler}
      />

      <div className="form__input-wrapper">
        <div className="form__name">Я согласен</div>
        <input onChange={mailingData} checked={mailing} className="chekbox" type="checkbox" /> <span className="checkbox-name">принимать актуальную информацию на емейл</span>
      </div>

      <div className="form__button-wrapper">
          <button onClick={submitData} disabled={!formValid} className="form__button" >Изменить</button>  <span className="form__button-description">последние изменения {time}</span>
      </div>

    </form>

  )
}

export default Form