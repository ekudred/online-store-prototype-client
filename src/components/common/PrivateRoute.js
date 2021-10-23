import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

export default function PrivateRoute({ component: Component, on, redirectTo = '/', ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return on ? <Component {...props} /> : <Redirect to={redirectTo} />
      }}
    />
  )
}
