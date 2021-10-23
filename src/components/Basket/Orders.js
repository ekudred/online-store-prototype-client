import React from 'react'

import Order from './Order'

import styles from '../../styles/Basket/Orders.module.scss'

export default function Orders({ items }) {
  return (
    <div className={styles.orders}>
      {items.length === 0 ? <h4>Корзина пуста</h4> : items.map(item => <Order key={item._id} item={item} />)}
    </div>
  )
}
