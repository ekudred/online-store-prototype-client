import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useDeleteUser, useGetUsers } from '../../../../hooks/fetch/admin/fetchAdminUsers'
import useActions from '../../../../hooks/useActions'
import ButtonLoadMore from '../ButtonLoadMore'
import UserItem from './Item'
import { Table, Head, Body, Item, Cell } from '../../../common/Table'
import AdminButton from '../../AdminButton'

export default function UsersTable() {
  const { users, totalCount, skip, limit } = useSelector(state => state.admin)

  const [headItem, setHeadItem] = useState(['Имя', 'Роль', 'Почта', 'Активирован'])
  const [activeUsers, setActiveUsers] = useState([])

  const { setSkipAdminUsers, setTotalCountAdminUsers, setAdminUsers } = useActions()
  const { getUsers, data, loading } = useGetUsers()
  const { deleteUser } = useDeleteUser()

  const loadMore = useCallback(() => {
    getUsers({ limit: limit.users, skip: skip.users })
  }, [skip])

  const setActiveUser = item => setActiveUsers(prev => [...prev, item])
  const removeActiveUser = item => {
    const newActiveUsers = [...activeUsers].filter(user => user !== item)
    setActiveUsers(newActiveUsers)
  }

  const onClickDelete = () => {
    deleteUser(activeUsers)
    setActiveUsers([])
  }

  useEffect(() => {
    if (users.length === 0) {
      getUsers({ limit: limit.users, skip: skip.users })
    }
  }, [])

  useEffect(() => {
    if (data !== null) {
      setSkipAdminUsers(data.users.length)
      setTotalCountAdminUsers(data.totalLength)
      setAdminUsers(data.users)
    }
  }, [data])

  return (
    <>
      <AdminButton style={{ width: '200px' }} disabled={activeUsers.length === 0 ? true : false} onClick={onClickDelete}>
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
          {users.map(item => (
            <UserItem key={item._id} item={item} setActive={setActiveUser} removeActive={removeActiveUser} />
          ))}
        </Body>
      </Table>
      <ButtonLoadMore visible={users.length !== totalCount.users || !users.length === 0} onClick={() => loadMore()} />
    </>
  )
}
