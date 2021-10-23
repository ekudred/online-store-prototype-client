import React from 'react'

import LoadableBox from '../common/LoadableBox'

import styles from '../../styles/Products/LoadableProductItem.module.scss'

export default function LoadableProductItem() {
  return (
    <div className={styles.product}>
      <div className={styles.box}>
        <LoadableBox height='230px' />
      </div>
    </div>
  )
}
