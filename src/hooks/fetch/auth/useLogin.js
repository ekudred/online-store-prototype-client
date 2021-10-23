import { useEffect } from 'react'
import useFetch from '../useFetch'
import { useGetBasket } from '../fetchBasket'

import AuthService from '../../../services/AuthService'
import useActions from '../../useActions'
import socket from '../../../API/socket'
import { User } from '../../../utils/DTOs'

export default function useLogin() {
  const { execute, loading, data, error } = useFetch(AuthService.login)
  const { setAuth, setUser } = useActions()

  const logIn = async ({ username, password }) => {
    await execute({ username, password })
  }

  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.accessToken)
      socket.emit('user/login', { accessToken: data.accessToken })
      setAuth(true)
      setUser(new User(data.user))
    }
  }, [data])

  return { logIn, loading, error }
}
