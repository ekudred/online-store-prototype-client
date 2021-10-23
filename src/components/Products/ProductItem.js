import React from 'react'
import { NavLink } from 'react-router-dom'

import { SERVER_URL } from '../../config'
import Image from '../common/Image'
import { DefaultRoutesConstants } from '../../utils/constants'

import styles from '../../styles/Products/ProductItem.module.scss'

export default function ProductItem({ item }) {
  return (
    <div className={styles.product}>
      <div className={styles.box}>
        <NavLink to={DefaultRoutesConstants.PRODUCTS_ROUTE + '/' + item._id} className={styles.img}>
          <Image src={`${SERVER_URL}/${item.img}`} />
        </NavLink>
        <div className={styles.title}>
          <div className={styles.brand}>{item.brand.name}</div>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.price}>{item.price}</div>
        </div>
      </div>
    </div>
  )
}
