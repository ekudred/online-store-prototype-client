import { useEffect } from 'react'
import useFetch from '../useFetch'

import AuthService from '../../../services/AuthService'
import { useRegisterUser } from '../admin/fetchAdminUsers'

export default function useRegistration() {
  const { execute, loading, data, message, error } = useFetch(AuthService.registration)
  const { informUserRegistation } = useRegisterUser()

  const register = async ({ username, email, password }) => {
    await execute({ username, email, password })
  }

  useEffect(() => {
    if (data) {
      informUserRegistation(data.user)
    }
  }, [data])

  return { register, loading, message, error }
}
