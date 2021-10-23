import React from 'react'

import { CSSTransition } from 'react-transition-group'

export default function TableWrapper({ children, visible }) {
  return (
    <CSSTransition in={visible || false} timeout={0} mountOnEnter unmountOnExit>
      {children}
    </CSSTransition>
  )
}
