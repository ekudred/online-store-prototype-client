import React from 'react'

import ScreenWrapper from '../components/common/ScreenWrapper'
import Auth from '../components/Auth/Auth'
import Login from '../components/Auth/Login'

import styles from '../styles/Auth/AuthTitle.module.scss'

export default function LoginPage() {
  return (
    <ScreenWrapper>
      <Auth>
        <Login />
        <div className={styles.title}>
          <h1>
            Войдите, войдите войдите
            <br />
            войдите войдите
          </h1>
          <p>
            Текст текст текст текст
            <br />
            текст текст текст текст текст
            <br />
            текст текст текст
          </p>
        </div>
      </Auth>
    </ScreenWrapper>
  )
}
