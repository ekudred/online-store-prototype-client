import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Pulse from '../common/Pulse'

import styles from '../../styles/Header/HeaderItem.module.scss'

export default function HeaderBasketItem() {
  const history = useHistory()
  const location = useLocation()

  const [active, setActive] = useState(false)

  const onClickButtonHandler = () => {
    if (to) history.push(to)
    if (onClick) onClick()
  }

  useEffect(() => {
    if (location.pathname === to) {
      setActive(true)
    } else {
      setActive(false)
    }
  })

  return (
    <button className={`${styles.button} ${title ? styles.title : ''} ${active ? styles.active : ''}`} onClick={onClickButtonHandler} ref={ref}>
      <Pulse circleClassName={styles.bg} className={styles.pulse}>
        {svg}
        {title}
      </Pulse>
    </button>
  )
}
