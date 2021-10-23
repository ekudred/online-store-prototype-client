import React from 'react'

import ScreenWrapper from '../components/common/ScreenWrapper'
import Auth from '../components/Auth/Auth'
import Registration from '../components/Auth/Registration'

import styles from '../styles/Auth/AuthTitle.module.scss'

export default function RegistrationPage() {
  return (
    <ScreenWrapper>
      <Auth>
        <Registration />
        <div className={styles.title}>
          <h1>
            Зарегистрируйтесь зарегистрируйтесь
            <br />
            зарегистрируйтесь
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
