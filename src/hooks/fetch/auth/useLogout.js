import { useEffect } from 'react'
import useFetch from '../useFetch'

import AuthService from '../../../services/AuthService'
import useActions from '../../useActions'

export default function useLogout() {
  const { execute, loading, data, error } = useFetch(AuthService.logout)
  const { setAuth, setUser, setBasket } = useActions()

  const logOut = async () => {
    await execute()
  }

  useEffect(() => {
    if (data) {
      localStorage.removeItem('accessToken')
      setAuth(false)
      setUser({})
      setBasket([])
    }
  }, [data])

  return { logOut, loading, error }
}
