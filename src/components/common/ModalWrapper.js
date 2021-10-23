import React, { useCallback, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from '../../styles/common/ModalWrapper.module.scss'

export default function ModalWrapper({ children, setVisibleModal, visibleModal }) {
  const holderRef = useRef()

  const onClickOutsideHandler = useCallback(
    e => {
      if (!holderRef.current.contains(e.target)) {
        setVisibleModal(false)
      }
    },
    [holderRef, setVisibleModal]
  )

  return (
    <CSSTransition in={visibleModal || false} timeout={0} mountOnEnter unmountOnExit>
      <div className={styles.wrapper}>
        <div className={styles.container} onClick={onClickOutsideHandler}>
          <div className={styles.holder} ref={holderRef}>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
