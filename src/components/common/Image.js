import React, { useEffect, useRef, useState } from 'react'

import styles from '../../styles/common/Image.module.scss'

export default function Image({ src, alt = 'image', width, height }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    if (isLoaded) return

    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true)
      }
    }
  }, [])

  return (
    <div className={`${styles.img} ${isLoaded ? styles.loaded : ''}`} style={{ width, height }}>
      <img ref={imageRef} className={isLoaded ? styles.loaded : ''} src={src} alt={alt} />
    </div>
  )
}
