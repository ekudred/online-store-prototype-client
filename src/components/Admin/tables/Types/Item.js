import React, { useState } from 'react'

import { useEditType } from '../../../../hooks/fetch/admin/fetchAdminShop'

import { CellInput, Edit, Item } from '../../../common/Table'

export default function TypeItem({ item, setActive, removeActive }) {
  const [activeItem, setActiveItem] = useState(false)
  const [editItem, setEditItem] = useState(false)

  const [value, setValue] = useState(item)

  const { editType } = useEditType()

  const onChangeCell = e => setValue({ ...value, [e.target.name]: e.target.value })
  const onClickActive = () => {
    if (!editItem) {
      setActiveItem(!activeItem)
      !activeItem ? setActive(value) : removeActive(value)
    }
  }
  const onClickEdit = () => {
    if (activeItem) {
      setActiveItem(false)
      removeActive(value)
    }
    setEditItem(true)
  }
  const onClickSave = () => {
    if (JSON.stringify(value) !== JSON.stringify(item)) {
      editType(value)
      setEditItem(false)
    }
  }
  const onClickCancel = () => {
    setValue(item)
    setEditItem(false)
  }

  return (
    <>
      <Item onClick={onClickActive} active={activeItem} editActive={editItem}>
        <CellInput value={value.name} name={'name'} onChange={onChangeCell} readOnly={!editItem} disabled={!editItem} />
      </Item>
      <Item>
        <Edit active={editItem} onClickEdit={onClickEdit} onClickSave={onClickSave} onClickCancel={onClickCancel} />
      </Item>
    </>
  )
}
