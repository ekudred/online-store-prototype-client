import React from 'react'
import { CSSTransition } from 'react-transition-group'

import AdminButton from '../AdminButton'

export default function ButtonLoadMore({ onClick, visible }) {
  return (
    <CSSTransition in={visible} timeout={0} mountOnEnter unmountOnExit>
      <AdminButton style={{ width: '100%', marginTop: '1rem', backgroundColor: 'rgba(134, 205, 233, 0.7)' }} onClick={onClick}>
        Загрузить ещё
      </AdminButton>
    </CSSTransition>
  )
}
