import React from 'react'

import styles from '../../styles/Header/HeaderWrapper.module.scss'

export default function HeaderWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.holder}>
        {children}
      </div>
    </div>
  )
}
