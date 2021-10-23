import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { UnAuthRoutesConstants } from '../../utils/constants'
import Button from '../common/Button'
import useRegistration from '../../hooks/fetch/auth/useRegistration'
import useValidation from '../../hooks/useValidation'

import { ReactComponent as LogoSVG } from '../../assets/ico/logo.svg'

import styles from '../../styles/Auth/AuthForm.module.scss'

export default function Registration() {
  const { register, loading, message, error } = useRegistration()

  const { onChangeLoginHandler, onChangePasswordHandler, onChangeEmailHandler } = useValidation()

  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [validLogin, setValidLogin] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  const onClickButtonHandler = () => {
    setValidLogin(false)
    setValidEmail(false)
    setValidPassword(false)
    setLogin('')
    setEmail('')
    setPassword('')
    register({ username: login, email, password })
  }

  return (
    <div className={styles.authForm}>
      <div className={styles.logo}>
        <NavLink to='/' className={styles.link}>
          <LogoSVG />
        </NavLink>
      </div>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'login'}>
            Логин
          </label>
          <input
            className={`${styles.input} ${validLogin ? styles.valid : ''}`}
            type='text'
            id={'login'}
            onChange={(e) => onChangeLoginHandler(e, setLogin, setValidLogin)}
            value={login}
          />
          <div className={styles.prompt}>От 4 до 14 символов, Латиница</div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'email'}>
            Электронная почта
          </label>
          <input
            className={`${styles.input} ${validEmail ? styles.valid : ''}`}
            type='text'
            id={'email'}
            onChange={(e) => onChangeEmailHandler(e, setEmail, setValidEmail)}
            value={email}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'password'}>
            Пароль
          </label>
          <input
            className={`${styles.input} ${validPassword ? styles.valid : ''}`}
            type='text'
            id={'password'}
            onChange={(e) => onChangePasswordHandler(e, setPassword, setValidPassword)}
            value={password}
          />
          <div className={styles.prompt}>От 8 до 32 символов</div>
        </div>
      </div>
      {error ? <div className={styles.error}>{error}</div> : ''}
      {message ? <div className={styles.message}>{message}</div> : ''}
      <Button
        buttonStyle={styles.button}
        disabled={validEmail && validPassword && validLogin ? false : true}
        loading={loading}
        onClick={onClickButtonHandler}
      >
        Зарегистрироваться
      </Button>
      <NavLink to={UnAuthRoutesConstants.LOGIN_ROUTE} className={styles.link}>
        Войти
      </NavLink>
    </div>
  )
}
