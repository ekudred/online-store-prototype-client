import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import BrandItem from './Item'
import ModalWrapper from '../../../common/ModalWrapper'
import { useDeleteBrand } from '../../../../hooks/fetch/admin/fetchAdminShop'
import CreateBrand from '../../modals/CreateBrand'
import { Body, Cell, Head, Item, Table } from '../../../common/Table'
import AdminButton from '../../AdminButton'

export default function BrandsTable() {
  const [visibleModal, setVisibleModal] = useState(false)

  const { brands } = useSelector(state => state.admin)
  const [activeBrands, setActiveBrands] = useState([])

  const [headItem, setHeadItem] = useState(['Название'])

  const setActiveBrand = item => setActiveBrands(prev => [...prev, item])
  const removeActiveBrand = item => {
    const newActiveBrands = [...activeBrands].filter(type => type !== item)
    setActiveBrands(newActiveBrands)
  }

  const { deleteBrand } = useDeleteBrand()

  const onClickCreate = () => setVisibleModal(true)
  const onClickDelete = () => {
    deleteBrand(activeBrands)
    setActiveBrands([])
  }

  return (
    <>
      <AdminButton style={{ width: '200px', marginRight: '1rem' }} onClick={onClickCreate}>
        Добавить бренд
      </AdminButton>
      <AdminButton style={{ width: '200px' }} disabled={activeBrands.length === 0 ? true : false} onClick={onClickDelete}>
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
          {brands.map(item => (
            <BrandItem key={item._id} item={item} setActive={setActiveBrand} removeActive={removeActiveBrand} />
          ))}
        </Body>
      </Table>
      <ModalWrapper visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <CreateBrand setVisibleModal={setVisibleModal} />
      </ModalWrapper>
    </>
  )
}
