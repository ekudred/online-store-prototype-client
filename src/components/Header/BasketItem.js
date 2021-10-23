import React from 'react'
import { NavLink } from 'react-router-dom'

import Image from '../common/Image'
import { SERVER_URL } from '../../config'
import { DefaultRoutesConstants } from '../../utils/constants'

import styles from '../../styles/Header/BasketItem.module.scss'

export default function BasketItem({ item, setVisible }) {
  return (
    <NavLink 
      to={DefaultRoutesConstants.PRODUCTS_ROUTE + '/' + item.product._id} 
      className={styles.item}
      onClick={() => setVisible(false)}
    >
      <Image src={`${SERVER_URL}/${item.product.img}`} />
    </NavLink>
  )
}
