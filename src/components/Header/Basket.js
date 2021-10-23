import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'
import { CSSTransition } from 'react-transition-group'
import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector } from 'react-redux'

import BasketItem from './BasketItem'
import { AuthRoutesConstants } from '../../utils/constants'

import styles from '../../styles/Header/Basket.module.scss'
import Button from '../common/Button'

export default function Basket({ visible, setVisible, addRef }) {
  const { basket } = useSelector(state => state.basket)

  const history = useHistory()

  const clickHandler = useCallback(
    e => {
      if (addRef.current && !addRef.current.contains(e.target)) {
        setVisible(false)
      }
    },
    [addRef, setVisible]
  )

  const onClickButton = () => {
    history.push(AuthRoutesConstants.BASKET_ROUTE)
    setVisible(false)
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [visible, clickHandler])

  return (
    <CSSTransition
      in={visible}
      timeout={0}
      mountOnEnter
      unmountOnExit
      classNames={{
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
        exitActive: styles.exitActive,
        exitDone: styles.exitDone,
      }}
    >
      <div className={styles.basket}>
        <Button buttonStyle={styles.button} onClick={onClickButton}>
          Перейти к корзине
        </Button>
        <div className={styles.box}>
          <Scrollbars autoHide>
            {basket.length === 0 ? (
              <div className={styles.empty}>В корзине еще нет товаров((</div>
            ) : (
              basket.map(item => <BasketItem key={item._id} item={item} setVisible={setVisible} />)
            )}
          </Scrollbars>
        </div>
      </div>
    </CSSTransition>
  )
}
