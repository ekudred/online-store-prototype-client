import React, { useState } from 'react'

import { useAdminUsersSubscription, useEditUser } from '../../../../hooks/fetch/admin/fetchAdminUsers'

import { CellInput, Cell, Item, Edit, CellSelect } from '../../../common/Table'

export default function UserItem({ item, setActive, removeActive }) {
  const [activeItem, setActiveItem] = useState(false)
  const [editItem, setEditItem] = useState(false)

  const [value, setValue] = useState(item)
  const [role, setRole] = useState({ name: value.role[0] })
  const [roles, setRoles] = useState([
    { name: 'USER', data: ['USER'] },
    { name: 'ADMIN', data: ['ADMIN', 'USER'] },
  ])

  useAdminUsersSubscription()

  const { editUser } = useEditUser()

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
    if (JSON.stringify({ ...value, role: role.data }) !== JSON.stringify(item)) {
      editUser({ ...value, role: role.data })
      setEditItem(false)
    }
  }
  const onClickCancel = () => {
    setValue(item)
    setRole({ name: value.role[0] })
    setEditItem(false)
  }

  return (
    <>
      <Item onClick={onClickActive} active={activeItem} editActive={editItem}>
        <CellInput value={value.username} name={'username'} onChange={onChangeCell} readOnly={!editItem} disabled={!editItem} />
        <CellSelect options={roles} select={role} disabled={!editItem} setSelect={setRole} />
        <CellInput value={value.email} readOnly={true} disabled={true} />
        <Cell value={value.isActivated ? 'Да' : 'Нет'} />
      </Item>
      <Item>
        <Edit active={editItem} onClickEdit={onClickEdit} onClickSave={onClickSave} onClickCancel={onClickCancel} />
      </Item>
    </>
  )
}
