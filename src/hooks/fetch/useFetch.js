import { useState, useMemo, useRef, useCallback, useEffect } from 'react'

export default function useFetch(asyncFunc) {
  const [loading, setLoading] = useState(null)
  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)

  const execute = useCallback(async (params) => {
      setLoading(true)

      await asyncFunc(params)
        .then((response) => {
          if (!mountedRef.current) return null

          setData(response.data)
          setMessage(response?.data?.message)
          setLoading(false)
        })
        .catch((error) => {
          if (!mountedRef.current) return null

          setError(error?.response?.data?.message)
          setLoading(false)
        })
    }, [asyncFunc])

  useEffect(() => {
    return () => {
      setLoading(null)
      setData(null)
      setMessage(null)
      setError(null)
      mountedRef.current = false
    }
  }, [])

  const resArray = { execute, loading, data, message, error }

  return useMemo(() => resArray, [resArray])
}
