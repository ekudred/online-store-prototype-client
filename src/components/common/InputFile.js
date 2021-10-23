import React, { useEffect, useState } from 'react'

import Image from './Image'
import useFileInput from '../../hooks/useFileInput'

import styles from '../../styles/common/InputFile.module.scss'

export default function InputFile({ setFile, htmlFor, initValue, hoverValue }) {
  const [title, setTitle] = useState(initValue)
  const [url, setUrl] = useState(null)

  const { onChangeFileInput, result, file } = useFileInput()
  
  const onMouseEnterLabel = () => setTitle(hoverValue)
  const onMouseLeaveLabel = () => setTitle(initValue)

  useEffect(() => {
    setUrl(result)
    setFile(file)
  }, [file, result])

  return (
    <div className={styles.box}>
      <input className={styles.input} id={htmlFor} type='file' onChange={onChangeFileInput} />
      <label
        className={`${styles.label} ${url ? styles.active : ''}`}
        htmlFor={htmlFor}
        onMouseEnter={onMouseEnterLabel}
        onMouseLeave={onMouseLeaveLabel}
      >
        {url ? <Image src={url} width='auto' heigh='100%' /> : ''}
        {url ? '' : <div className={styles.title}>{title}</div>}
      </label>
    </div>
  )
}
