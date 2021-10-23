import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { CSSTransition } from 'react-transition-group'

import styles from '../../styles/common/Select.module.scss'

export default function Select({ options, select, setSelect, maxHeight = '200px', disabled, buttonStyles = null, selectStyles = null, activeClass }) {
  const [visible, setVisible] = useState(false)

  const boxRef = useRef()

  const onClickOptionHandler = item => {
    setSelect(item)
    setVisible(false)
  }

  const onClickDocumentHandler = useCallback(
    e => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setVisible(false)
      }
    },
    [boxRef]
  )

  useEffect(() => {
    document.addEventListener('click', onClickDocumentHandler)
    return () => document.removeEventListener('click', onClickDocumentHandler)
  }, [visible])

  return (
    <div className={styles.selectBox} ref={boxRef}>
      <button className={styles.select} style={{ ...buttonStyles, ...selectStyles }} disabled={disabled} onClick={() => setVisible(!visible)}>
        {select?.name}
      </button>
      <div className={styles.holder}>
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
          <div className={styles.options}>
            <Scrollbars autoHide autoHeight autoHeightMax={maxHeight}>
              {options?.map((item, i) => (
                <button
                  key={i}
                  className={`${styles.option} ${select?.name === item.name ? styles.active : ''}`}
                  style={buttonStyles}
                  onClick={() => onClickOptionHandler(item)}
                >
                  {item.name}
                </button>
              ))}
            </Scrollbars>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
