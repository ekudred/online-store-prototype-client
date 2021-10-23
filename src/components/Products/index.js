import React, { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import useActions from '../../hooks/useActions'
import { useGetAllBrands, useGetAllTypes, useGetProducts } from '../../hooks/fetch/fetchShop'
import { useObserver } from '../../hooks/useObserver'

import LoadableProductItem from './LoadableProductItem'
import ProductItem from './ProductItem'
import FilterProducts from '../common/FilterProducts'

import styles from '../../styles/Products/ProductItems.module.scss'

export default function Products() {
  const { products, brands, types, totalCount, skip, limit, filter } = useSelector(state => state.shop)
  const { setSkipProducts, setTotalCountProducts, setProducts, setTypes, setBrands } = useActions()

  const { getProducts, data: dataProducts, loading } = useGetProducts()
  const { getAllBrands, data: brandData } = useGetAllBrands()
  const { getAllTypes, data: typeData } = useGetAllTypes()

  const loadMoreRef = useRef()
  useObserver(loadMoreRef, products.length < totalCount, loading, () =>
    getProducts({ type_id: filter.type?._id, brand_id: filter.brand?._id, limit, skip })
  )

  const loadingArray = useMemo(() => {
    let arr = []
    for (let i = 0; i < limit; i++) {
      arr.push(i)
    }
    return arr
  }, [limit])

  useEffect(() => {
    if (products.length === 0) {
      getProducts({ type_id: filter.type_id, brand_id: filter.brand_id, limit, skip })
    }

    if (brands.length === 0 && types.length === 0) {
      getAllBrands()
      getAllTypes()
    }
  }, [])

  useEffect(() => {
    if (brandData !== null && typeData !== null) {
      setTypes(typeData)
      setBrands(brandData)
    }
  }, [brandData, typeData])

  useEffect(() => {
    if (dataProducts !== null) {
      setSkipProducts(dataProducts.products.length)
      setTotalCountProducts(dataProducts.totalLength)
      setProducts(dataProducts.products)
    }
  }, [dataProducts])

  return (
    <div className={styles.products}>
      <div className={styles.head}>
        <div className={styles.container}>
          <FilterProducts />
        </div>
      </div>
      <div className={styles.items}>
        {products.map(item => (
          <ProductItem key={item._id} item={item} />
        ))}
        {loading ? loadingArray.map((item, i) => <LoadableProductItem key={i} />) : ''}
        {!loading && products.length === 0 ? <h2>К сожалению, ничего не найдено</h2> : ''}
      </div>
      <div ref={loadMoreRef} className={styles.loadMore}></div>
    </div>
  )
}
