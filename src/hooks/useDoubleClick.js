import { useRef, useState } from 'react'

export default function useDoubleClick(execute) {
  const [clicks, setClicks] = useState([])
  const timeout = useRef()

  const onDoubleClick = e => {
    e.preventDefault()
    clicks.push(new Date().getTime())
    window.clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      if (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250) {
        execute()
      }
    }, 250)
  }

  return { onDoubleClick }
}
