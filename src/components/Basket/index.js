import React from 'react'
import { useSelector } from 'react-redux'

import Orders from './Orders'
import Result from './Result'

import styles from '../../styles/Basket/Basket.module.scss'

export default function Basket() {
  const { basket } = useSelector(state => state.basket)

  return (
    <div className={styles.basket}>
      <h1 className={styles.title}>Мои заказы</h1>
      <div className={styles.container}>
        <Orders items={basket} />
        <Result />
      </div>
    </div>
  )
}
