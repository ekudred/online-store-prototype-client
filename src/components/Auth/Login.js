import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { UnAuthRoutesConstants } from '../../utils/constants'
import Button from '../common/Button'
import useLogin from '../../hooks/fetch/auth/useLogin'
import useValidation from '../../hooks/useValidation'

import { ReactComponent as LogoSVG } from '../../assets/ico/logo.svg'

import styles from '../../styles/Auth/AuthForm.module.scss'

export default function Login() {
  const { logIn, loading, error } = useLogin()

  const { onChangeLoginHandler, onChangePasswordHandler } = useValidation()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [validLogin, setValidLogin] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  const onClickButton = () => {
    setValidLogin(false)
    setValidPassword(false)
    setLogin('')
    setPassword('')
    logIn({ username: login, password })
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
          <input className={styles.input} type='text' id={'login'} onChange={(e) => onChangeLoginHandler(e, setLogin, setValidLogin)} value={login} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'password'}>
            Пароль
          </label>
          <input
            className={styles.input}
            type='password'
            id={'password'}
            onChange={(e) => onChangePasswordHandler(e, setPassword, setValidPassword)}
            value={password}
          />
        </div>
      </div>
      {error ? <div className={styles.error}>{error}</div> : ''}
      <Button buttonStyle={styles.button} disabled={validLogin && validPassword ? false : true} loading={loading} onClick={onClickButton}>
        Войти
      </Button>
      <NavLink to={UnAuthRoutesConstants.REGISTRATION_ROUTE} className={styles.link}>
        Зарегистрироваться
      </NavLink>
    </div>
  )
}
