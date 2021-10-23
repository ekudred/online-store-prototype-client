import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useCreateProduct } from '../../../hooks/fetch/admin/fetchAdminShop'
import InputFile from '../../common/InputFile'
import Button from '../../common/Button'

import styles from '../../../styles/Admin/Modal.module.scss'
import Select from '../../common/Select'

export default function CreateProduct({ setVisibleModal }) {
  const { types, brands } = useSelector(state => state.admin)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(100)
  const [img, setImg] = useState({})

  const [type, setType] = useState({})
  const [brand, setBrand] = useState({})

  const { createProduct } = useCreateProduct()

  const onClickAdd = () => {
    if (price <= 0) return

    createProduct({
      name,
      type_id: type._id,
      brand_id: brand._id,
      price,
      info: { title, description },
      img: img.result,
    })

    setVisibleModal(false)
  }

  const onClickRemove = () => {
    setVisibleModal(false)
  }

  useEffect(() => {
    setType(types[0])
    setBrand(brands[0])
  }, [types, brands])

  return (
    <div className={styles.modal}>
      <h4 className={styles.title}>Добавить товар</h4>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'name'}>
            Название товара
          </label>
          <input value={name} onChange={e => setName(e.target.value)} className={styles.input} type='text' id={'name'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Выберите тип</label>
          <Select options={types} select={type} setSelect={setType} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Выберите бренд</label>
          <Select options={brands} select={brand} setSelect={setBrand} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'title'}>
            Заголовок
          </label>
          <input value={title} onChange={e => setTitle(e.target.value)} className={styles.input} type='text' id={'title'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'description'}>
            Описание
          </label>
          <input value={description} onChange={e => setDescription(e.target.value)} className={styles.input} type='text' id={'description'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'price'}>
            Цена продукта
          </label>
          <input value={price} onChange={e => setPrice(e.target.value)} className={styles.input} type='number' id={'price'} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={'img'}>
            Изображение продукта
          </label>
          <InputFile setFile={setImg} htmlFor={'img'} initValue='Изображение не выбрано' hoverValue='Выберите изображение' />
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
