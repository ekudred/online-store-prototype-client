import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Avatar from './Avatar'

import styles from '../../styles/Profile/Profile.module.scss'

export default function Profile() {
  const { user } = useSelector(state => state.auth)

  const [list, setList] = useState([
    { key: 'Имя', value: user.username },
    { key: 'Электронная почта', value: user.email },
  ])

  return (
    <div className={styles.profile}>
      <h1>Профиль</h1>
      <div className={styles.avatar}>
        <Avatar />
      </div>
      <ul className={styles.list}>
        {list.map(item => (
          <li className={styles.item} key={item.key}>
            <div className={styles.key}>{item.key}</div>
            <h4 className={styles.value}>{item.value}</h4>
          </li>
        ))}
      </ul>
    </div>
  )
}
