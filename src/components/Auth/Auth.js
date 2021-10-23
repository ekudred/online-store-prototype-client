import React from 'react'

import styles from '../../styles/Auth/Auth.module.scss'

export default function Auth({ children }) {
  return <div className={styles.auth}>{children}</div>
}
