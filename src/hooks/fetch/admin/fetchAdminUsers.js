import { useEffect } from 'react'

import useFetch from '../useFetch'
import UserService from '../../../services/UserService'
import useActions from '../../useActions'
import socket from '../../../API/socket'

export function useGetUsers() {
  const { execute, loading, data, message, error } = useFetch(UserService.getUsers)

  const getUsers = async ({ skip, limit }) => {
    await execute({ skip, limit })
  }

  return { getUsers, data, loading, message, error }
}

export function useRegisterUser() {
  const informUserRegistation = user => socket.emit('admin/users/user:register', { user })
  return { informUserRegistation }
}

export function useEditUser() {
  const editUser = user => socket.emit('admin/users/user:edit', { user })
  return { editUser }
}
export function useDeleteUser() {
  const deleteUser = users => socket.emit('admin/users/user:delete', { users })
  return { deleteUser }
}

export function useAdminUsersSubscription() {
  const { setAdminUser, editAdminUser, deleteAdminUser } = useActions()

  useEffect(() => {
    socket.on('admin/users/user:registered', data => setAdminUser(data))

    socket.on('admin/users/user:edited', data => editAdminUser(data))
    socket.on('admin/users/user:deleted', data => deleteAdminUser(data))

    return () => {
      socket.off('admin/users/user:registered')

      socket.off('admin/users/user:edited')
      socket.off('admin/users/user:deleted')
    }
  }, [])
}
