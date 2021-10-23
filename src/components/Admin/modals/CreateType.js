import React, { useState } from 'react'

import { useCreateType } from '../../../hooks/fetch/admin/fetchAdminShop'
import Button from '../../common/Button'

import styles from '../../../styles/Admin/Modal.module.scss'

export default function CreateBrand({ setVisibleModal }) {
  const [name, setName] = useState('')

  const { createType } = useCreateType()

  const onClickAdd = () => {
    if (name === '') return
    createType(name)
    setVisibleModal(false)
  }

  const onClickRemove = () => {
    setVisibleModal(false)
  }

  return (
    <div className={styles.modal}>
      <h4 className={styles.title}>Добавить тип</h4>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'name'}>
            Название типа
          </label>
          <input value={name} onChange={e => setName(e.target.value)} className={styles.input} type='text' id={'name'} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button buttonStyle={`${styles.button} ${styles.cancel}`} onClick={onClickRemove}>
          Отменить
        </Button>
        <Button buttonStyle={`${styles.button} ${styles.add}`} onClick={onClickAdd}>
          Добавить
        </Button>
      </div>
    </div>
  )
}
