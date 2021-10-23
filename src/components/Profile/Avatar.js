import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useFileInput from '../../hooks/useFileInput'
import { useEditAvatar } from '../../hooks/fetch/user/fetchUser'
import Image from '../common/Image'
import Button from '../common/Button'
import { SERVER_URL } from '../../config'

import styles from '../../styles/Profile/Avatar.module.scss'

export default function Avatar() {
  const { user } = useSelector(state => state.auth)
  const [src, setSrc] = useState(`${SERVER_URL}/${user.avatar}`)
  const [edit, setEdit] = useState(false)

  const { onChangeFileInput, result } = useFileInput()
  const { editAvatar } = useEditAvatar()

  const onClickEdit = () => {
    editAvatar(src)
    setEdit(false)
  }

  const onClickCancel = () => {
    setSrc(`${SERVER_URL}/${user.avatar}`)
    setEdit(false)
  }

  useEffect(() => {
    if (result) {
      setSrc(result)
      setEdit(true)
    }
  }, [result])

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <input className={styles.input} id='avatar' type='file' onChange={onChangeFileInput} />
        <label className={styles.label} htmlFor='avatar'>
          {src ? <Image src={src} width='100%' heigh='100%' /> : ''}
          <div className={styles.title}>Изменить аватар</div>
        </label>
      </div>
      {edit ? (
        <div className={styles.buttons}>
          <Button buttonStyle={styles.button} onClick={onClickEdit}>
            Изменить
          </Button>
          <Button buttonStyle={styles.button} onClick={onClickCancel}>
            Отмена
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
