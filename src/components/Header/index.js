import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UnAuthRoutesConstants, AuthRoutesConstants, AdminRoutesConstants } from '../../utils/constants'
import HeaderWrapper from './HeaderWrapper'
import HeaderItem from './HeaderItem'
import Pulse from '../common/Pulse'
import Basket from './Basket'
import useActions from '../../hooks/useActions'

import { ReactComponent as AuthSVG } from '../../assets/ico/auth.svg'
import { ReactComponent as BurgerSVG } from '../../assets/ico/burger.svg'
import { ReactComponent as BasketSVG } from '../../assets/ico/basket.svg'
import { ReactComponent as AccountSVG } from '../../assets/ico/account.svg'

import styles from '../../styles/Header/Header.module.scss'

export default function Header() {
  const { isAuth, user } = useSelector((state) => state.auth)
  const { showNavbar } = useActions()

  const basketRef = useRef()
  const [visibleBasket, setVisibleBasket] = useState(false)

  const onClickBasketHandler = () => {
    setVisibleBasket(!visibleBasket)
  }

  const onClickBurgerHandler = () => {
    showNavbar(true)
  }

  return (
    <HeaderWrapper>
      <header className={styles.header}>
        <button className={styles.burger} onClick={onClickBurgerHandler}>
          <BurgerSVG />
        </button>
        <div className={styles.items}>
          {isAuth ? (
            <>
              {user.role === 'ADMIN' ? <NavLink to={AdminRoutesConstants.ADMIN_ROUTE} className={styles.console}><Pulse circleClassName={styles.bg} className={styles.pulse}>Консоль</Pulse></NavLink> : ''}
              <div className={styles.holder} ref={basketRef}>
                <HeaderItem svg={<BasketSVG />} onClick={onClickBasketHandler} />
                <Basket visible={visibleBasket} setVisible={setVisibleBasket} addRef={basketRef} />
              </div>
              <HeaderItem to={AuthRoutesConstants.PROFILE_ROUTE} svg={<AccountSVG />} />
            </>
          ) : (
            <HeaderItem to={UnAuthRoutesConstants.LOGIN_ROUTE} svg={<AuthSVG />} title='Вход' />
          )}
        </div>
      </header>
    </HeaderWrapper>
  )
}
