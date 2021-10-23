import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import TypeItem from './Item'
import ModalWrapper from '../../../common/ModalWrapper'
import CreateType from '../../modals/CreateType'
import { useDeleteType } from '../../../../hooks/fetch/admin/fetchAdminShop'
import { Body, Cell, Head, Item, Table } from '../../../common/Table'
import AdminButton from '../../AdminButton'

export default function TypesTable() {
  const [visibleModal, setVisibleModal] = useState(false)

  const { types } = useSelector(state => state.admin)
  const [activeTypes, setActiveTypes] = useState([])

  const [headItem, setHeadItem] = useState(['Название'])

  const setActiveType = item => setActiveTypes(prev => [...prev, item])
  const removeActiveType = item => {
    const newActiveTypes = [...activeTypes].filter(type => type !== item)
    setActiveTypes(newActiveTypes)
  }

  const { deleteType } = useDeleteType()

  const onClickCreate = () => setVisibleModal(true)
  const onClickDelete = () => {
    deleteType(activeTypes)
    setActiveTypes([])
  }

  return (
    <>
      <AdminButton style={{ width: '200px', marginRight: '1rem' }} onClick={onClickCreate}>
        Добавить тип
      </AdminButton>
      <AdminButton style={{ width: '200px' }} disabled={activeTypes.length === 0 ? true : false} onClick={onClickDelete}>
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
          {types.map(item => (
            <TypeItem key={item._id} item={item} setActive={setActiveType} removeActive={removeActiveType} />
          ))}
        </Body>
      </Table>
      <ModalWrapper visibleModal={visibleModal} setVisibleModal={setVisibleModal}>
        <CreateType setVisibleModal={setVisibleModal} />
      </ModalWrapper>
    </>
  )
}
