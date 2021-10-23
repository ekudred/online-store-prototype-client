import React from 'react'

import styles from '../../styles/common/ScreenWrapper.module.scss'

export default function ScreenWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.holder}>{children}</div>
    </div>
  )
}
