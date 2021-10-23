import { useEffect, useRef } from 'react'

export const useObserver = (ref, load, loading, callback) => {
  const observer = useRef()

  useEffect(() => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    const cb = (entries, observer) => {
      if (entries[0].isIntersecting && load) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb)
    observer.current.observe(ref.current)
  }, [loading])
}
