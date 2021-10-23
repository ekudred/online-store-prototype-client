import React from 'react'

import styles from '../../styles/common/Wrapper.module.scss'

export default function Wrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.holder}>{children}</div>
    </div>
  )
}
