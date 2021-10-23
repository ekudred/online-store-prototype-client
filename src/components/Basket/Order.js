import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useActions from '../../hooks/useActions'
import { useDeleteBasketItem, useEditBasketItem } from '../../hooks/fetch/fetchBasket'
import Image from '../common/Image'
import { SERVER_URL } from '../../config'
import { DefaultRoutesConstants } from '../../utils/constants'

import { ReactComponent as CloseSVG } from '../../assets/ico/close.svg'
import { ReactComponent as PlusSVG } from '../../assets/ico/plus.svg'
import { ReactComponent as MinusSVG } from '../../assets/ico/minus.svg'

import styles from '../../styles/Basket/Order.module.scss'

export default function Order({ item }) {
  const { basket: basket_id } = useSelector(state => state.auth.user)

  const [amount, setAmount] = useState(item.amount)

  const { editBasketItem: editAmount } = useActions()

  const { deleteBasketItem } = useDeleteBasketItem()
  const { editBasketItem } = useEditBasketItem()

  const onClickDecrement = () => {
    if (amount > 1) {
      setAmount(prev => prev - 1)
      editAmount({ product_id: item.product._id, amount: amount - 1 })
      editBasketItem({ basket_id, product_id: item.product._id, amount: amount - 1 })
    }
  }
  const onClickIncrement = () => {
    if (amount < 99) {
      setAmount(prev => prev + 1)
      editAmount({ product_id: item.product._id, amount: amount + 1 })
      editBasketItem({ basket_id, product_id: item.product._id, amount: amount + 1 })
    }
  }
  const onClickRemove = () => deleteBasketItem({ basket_id, product_id: item.product._id })

  return (
    <div className={styles.order}>
      <NavLink to={DefaultRoutesConstants.PRODUCTS_ROUTE + '/' + item.product._id} className={styles.img}>
        <Image src={`${SERVER_URL}/${item.product.img}`} width={'170px'} height={'210px'} />
      </NavLink>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.name}>{item.product.name}</p>
          <p className={styles.type}>{item.product.type.name}</p>
          <p className={styles.brand}>{item.product.brand.name}</p>
        </div>
        <div className={styles.calc}>
          <div className={styles.count}>
            <button className={styles.decrement} onClick={onClickDecrement}>
              <MinusSVG />
            </button>
            <div className={styles.amount}>{String(amount)}</div>
            <button className={styles.increment} onClick={onClickIncrement}>
              <PlusSVG />
            </button>
          </div>
          <h4 className={styles.price}>{String(item.product.price * amount)}</h4>
        </div>
      </div>
      <div className={styles.cancel} onClick={onClickRemove}>
        <CloseSVG />
      </div>
    </div>
  )
}
