import React from 'react'

import Pulse from '../common/Pulse'

import styles from '../../styles/Admin/AdminButton.module.scss'

export default function AdminButton({ children, buttonStyle, style, disabled, onClick }) {
  return (
    <button className={`${styles.button} ${buttonStyle || ''}`} style={style} onClick={onClick} disabled={disabled || false}>
      <Pulse className={styles.pulse} circleClassName={styles.bg}>
        {children}
      </Pulse>
    </button>
  )
}
