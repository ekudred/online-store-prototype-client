import React, { useState } from 'react'

import ModalWrapper from './ModalWrapper'
import FilterModal from '../Products/FilterModal'

import { ReactComponent as FilterSVG } from '../../assets/ico/filter.svg'

import styles from '../../styles/common/FilterProducts.module.scss'

export default function FilterProducts() {
  const [visibleModal, setVisibleModal] = useState(false)

  return (
    <>
      <div className={styles.filter} onClick={() => setVisibleModal(true)}>
        <FilterSVG />
      </div>
      <ModalWrapper visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <FilterModal setVisibleModal={setVisibleModal} />
      </ModalWrapper>
    </>
  )
}
