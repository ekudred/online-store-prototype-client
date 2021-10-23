import React, { useEffect, useState } from 'react'

import { useGetProducts } from '../../hooks/fetch/fetchShop'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import Button from '../common/Button'
import Select from '../common/Select'

import styles from '../../styles/Product/FilterModal.module.scss'

export default function FilterModal({ setVisibleModal }) {
  const { limit, brands, types, filter } = useSelector(state => state.shop)

  const [applicable, setApplicable] = useState(false)

  const [type, setType] = useState({})
  const [brand, setBrand] = useState({})

  const { setSkipProducts, setTotalCountProducts, setProducts, clearProducts, setFilter } = useActions()
  const { getProducts, data: dataProducts, loading } = useGetProducts()

  const onClickRemove = () => setVisibleModal(false)
  const onClickSetFilter = () => getProducts({ type_id: filter.type._id, brand_id: filter.brand._id, limit, skip: 0 })

  useEffect(() => {
    if (dataProducts !== null) {
      clearProducts()
      setSkipProducts(dataProducts.products.length)
      setTotalCountProducts(dataProducts.totalLength)
      setProducts(dataProducts.products)
      setVisibleModal(false)
    }
  }, [dataProducts])

  useEffect(() => {
    setType(filter?.type || { name: 'Все', _id: null })
    setBrand(filter?.brand || { name: 'Все', _id: null })

    return () => {
      setType({})
      setBrand({})
    }
  }, [])

  useEffect(() => {
    if (type?._id || brand?._id) {
      setApplicable(true)
    }

    setFilter({ type, brand })
  }, [type, brand])

  return (
    <div className={styles.modal}>
      <h4 className={styles.title}>Фильтр товаров</h4>
      <div className={styles.inputs}>
        <div className={styles.field}>
          <label className={styles.label}>Тип</label>
          <Select options={[{ name: 'Все', _id: null }, ...types]} select={type} setSelect={setType} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Бренд</label>
          <Select options={[{ name: 'Все', _id: null }, ...brands]} select={brand} setSelect={setBrand} />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button buttonStyle={`${styles.button} ${styles.cancel}`} onClick={onClickRemove}>
          Отменить
        </Button>
        <Button buttonStyle={`${styles.button} ${styles.add}`} onClick={onClickSetFilter} disabled={!applicable}>
          Применить
        </Button>
      </div>
    </div>
  )
}
