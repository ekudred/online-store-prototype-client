import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Button from '../common/Button'

import styles from '../../styles/Basket/Result.module.scss'

export default function Result() {
  const { basket } = useSelector(state => state.basket)

  const totalPrice = useMemo(() => basket.reduce((accum, current) => accum + current.price, 0), [basket])

  return (
    <div className={styles.wrapper}>
      <div className={styles.result}>
        <div className={styles.price}>
          <div className={styles.box}>
            <h3>Итог</h3>
            <h3 className={styles.output}>{String(totalPrice)}</h3>
          </div>
          <p>Товары, {String(basket.length)} шт.</p>
        </div>
        <div className={styles.delivery}>
          <div className={styles.box}>
            <h4>Доставка:</h4>
            <h4 className={styles.output}>Самовывоз</h4>
          </div>
          <p>Свердловская обл., г. Екатеринбург, пр. Ленина, д. 66</p>
        </div>
        <div className={styles.payment}>
          <div className={styles.box}>
            <h4>Оплата:</h4>
            <h4 className={styles.output}>Картой</h4>
          </div>
        </div>
        <Button buttonStyle={styles.button}>Оформить заказ</Button>
      </div>
    </div>
  )
}
