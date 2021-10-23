import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetProducts } from '../../../../hooks/fetch/fetchShop'
import { useDeleteProduct } from '../../../../hooks/fetch/admin/fetchAdminShop'
import useActions from '../../../../hooks/useActions'

import ProductItem from './Item'
import { Table, Head, Body, Item, Cell } from '../../../common/Table'
import CreateProduct from '../../modals/CreateProduct'
import ModalWrapper from '../../../common/ModalWrapper'
import AdminButton from '../../AdminButton'
import ButtonLoadMore from '../ButtonLoadMore'

export default function ProductsTable() {
  const [visibleModal, setVisibleModal] = useState(false)

  const { products, totalCount, skip, limit } = useSelector(state => state.admin)
  const [activeProducts, setActiveProducts] = useState([])

  const [headItem, setHeadItem] = useState(['Название', 'Тип', 'Бренд', 'Цена, руб.', 'Заголовок', 'Описание', 'Изображение', 'Рейтинг'])

  const { setSkipAdminProducts, setTotalCountAdminProducts, setAdminProducts } = useActions()
  const { getProducts, data, loading } = useGetProducts()
  const { deleteProduct } = useDeleteProduct()

  const loadMore = useCallback(() => {
    getProducts({ limit: limit.products, skip: skip.products })
  }, [skip])

  const setActiveProduct = item => setActiveProducts(prev => [...prev, item])
  const removeActiveProduct = item => {
    const newActiveProducts = [...activeProducts].filter(product => product !== item)
    setActiveProducts(newActiveProducts)
  }

  const onClickCreate = () => setVisibleModal(true)
  const onClickDelete = () => {
    deleteProduct(activeProducts)
    setActiveProducts([])
  }

  useEffect(() => {
    if (products.length === 0) {
      getProducts({ limit: limit.products, skip: skip.products })
    }
  }, [])

  useEffect(() => {
    if (data !== null) {
      setSkipAdminProducts(data.products.length)
      setTotalCountAdminProducts(data.totalLength)
      setAdminProducts(data.products)
    }
  }, [data])

  return (
    <>
      <AdminButton style={{ width: '200px', marginRight: '1rem' }} onClick={onClickCreate}>
        Добавить товар
      </AdminButton>
      <AdminButton style={{ width: '200px' }} disabled={activeProducts.length === 0 ? true : false} onClick={onClickDelete}>
        Удалить
      </AdminButton>
      <Table>
        <Head>
          <Item>
            {headItem.map((item, i) => (
              <Cell key={i} disabled={true} value={item} />
            ))}
          </Item>
        </Head>
        <Body>
          {products.map(item => (
            <ProductItem key={item._id} item={item} setActive={setActiveProduct} removeActive={removeActiveProduct} />
          ))}
        </Body>
      </Table>
      <ButtonLoadMore visible={products.length !== totalCount.products || !products.length === 0} onClick={() => loadMore()} />
      <ModalWrapper visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <CreateProduct setVisibleModal={setVisibleModal} />
      </ModalWrapper>
    </>
  )
}
