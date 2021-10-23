import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { useSwipeable } from 'react-swipeable'

import { AuthRoutesConstants, DefaultRoutesConstants } from '../../utils/constants'
import NavbarItem from './NavbarItem'
import Loader from '../common/Loader'
import useActions from '../../hooks/useActions'
import useLogout from '../../hooks/fetch/auth/useLogout'

import { ReactComponent as BackwardArrowSVG } from '../../assets/ico/backward-arrow.svg'
import { ReactComponent as HomeSVG } from '../../assets/ico/home.svg'
import { ReactComponent as ProductsSVG } from '../../assets/ico/products.svg'
import { ReactComponent as BasketSVG } from '../../assets/ico/basket.svg'
import { ReactComponent as AccountSVG } from '../../assets/ico/account.svg'
import { ReactComponent as ExitSVG } from '../../assets/ico/exit.svg'

import styles from '../../styles/Navbar/Navbar.module.scss'

export default function Navbar() {
  const { isAuth } = useSelector(state => state.auth)
  const { isShow, coordX } = useSelector(state => state.navbar)

  const { showNavbar } = useActions()
  const { logOut, loading } = useLogout()

  const [list, setList] = useState([
    {
      title: 'Главная',
      auth: false,
      href: DefaultRoutesConstants.HOME_ROUTE,
      svg: <HomeSVG />,
    },
    {
      title: 'Каталог',
      auth: false,
      href: DefaultRoutesConstants.PRODUCTS_ROUTE,
      svg: <ProductsSVG />,
    },
    {
      title: 'Корзина',
      auth: true,
      href: AuthRoutesConstants.BASKET_ROUTE,
      svg: <BasketSVG />,
    },
    {
      title: 'Профиль',
      auth: true,
      href: AuthRoutesConstants.PROFILE_ROUTE,
      svg: <AccountSVG />,
    },
  ])

  const onClickExitHandler = () => {
    logOut()
    showNavbar(false)
  }

  const onClickWrapperHandler = e => {
    if (isShow && e.target.classList.contains(styles.wrapper)) {
      showNavbar(false)
    }
  }

  const onKeyDownHandler = () => {
    document.addEventListener('keydown', e => {
      if (isShow && e.keyCode === 27) {
        showNavbar(false)
      }
    })
  }

  const { ref } = useSwipeable({
    onSwipedLeft: event => {
      if (event.deltaX <= -100) {
        if (!isShow) return

        showNavbar(false)
      }
    },
  })

  useEffect(() => onKeyDownHandler(), [isShow])
  useEffect(() => ref(document))

  if (loading) {
    return <Loader />
  }

  return (
    <div className={classNames({ [styles.wrapper]: true, [styles.active]: isShow })} onClick={onClickWrapperHandler}>
      <nav className={styles.nav} style={{ left: coordX }}>
        <div className={styles.backward} onClick={() => showNavbar(false)}>
          <BackwardArrowSVG />
        </div>
        <ul className={styles.list}>
          {list.map((item, i) => {
            if (item.auth && isAuth) {
              return <NavbarItem key={i} to={item.href} svg={item.svg} title={item.title} onClick={() => showNavbar(false)} />
            } else if (!item.auth) {
              return <NavbarItem key={i} to={item.href} svg={item.svg} title={item.title} onClick={() => showNavbar(false)} />
            }
          })}
        </ul>
        {isAuth ? (
          <ul className={styles.exit}>
            <NavbarItem
              to={DefaultRoutesConstants.HOME_ROUTE}
              svg={<ExitSVG />}
              title={'Выход'}
              activeClassName={styles.active}
              onClick={onClickExitHandler}
            ></NavbarItem>
          </ul>
        ) : (
          ''
        )}
      </nav>
    </div>
  )
}
