import { useState, useCallback, useEffect, useRef } from 'react'
import axios from 'axios'

import { User } from '../../../utils/DTOs'
import { API_URL } from '../../../config'

import useActions from '../../useActions'

export default function useCheckAuth() {
  const [loading, setLoading] = useState(null)
  const mountedRef = useRef(true)

  const { setAuth, setUser } = useActions()

  const checkAuth = useCallback(async () => {
    setLoading(true)

    return await axios
      .get(`${API_URL}/auth/refresh`, { withCredentials: true })
      .then(response => {
        if (!mountedRef.current) return null

        localStorage.setItem('accessToken', response.data.accessToken)
        setAuth(true)
        setUser(new User(response.data.user))
        setLoading(false)
      })
      .catch(error => {
        if (!mountedRef.current) return null

        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setAuth, setUser])

  useEffect(() => {
    return () => {
      setLoading(null)
      mountedRef.current = false
    }
  }, [])

  return { checkAuth, loading }
}
