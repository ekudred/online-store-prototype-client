import React from 'react'

import Pulse from './Pulse'

import styles from '../../styles/common/Button.module.scss'

export default function Button({ buttonStyle, style, disabled, onClick, loading, children }) {
  return (
    <button className={`${styles.button} ${buttonStyle || ''}`} style={style} onClick={onClick} disabled={disabled || false}>
      <Pulse className={styles.pulse} circleClassName={styles.cc}>
        {loading ? <div className={styles.loading}>Загрузка...</div> : children}
      </Pulse>
    </button>
  )
}
