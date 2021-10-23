import React from 'react'
import { NavLink } from 'react-router-dom'

import Pulse from '../common/Pulse'

import styles from '../../styles/Navbar/NavbarItem.module.scss'

export default function NavbarItem({ to, svg, title, activeClassName = styles.active, onClick }) {
  return (
    <li className={styles.item}>
      <NavLink exact to={to} className={styles.link} activeClassName={activeClassName} onClick={onClick}>
        <Pulse circleClassName={styles.bg} className={styles.pulse}>
          {svg}
          {title}
        </Pulse>
      </NavLink>
    </li>
  )
}
