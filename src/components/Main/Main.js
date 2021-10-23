import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { adminRoutes, authRoutes, defaultRoutes, unAuthRoutes } from '../../routes'
import PrivateRoute from '../common/PrivateRoute'
import Loader from '../common/Loader'

import styles from '../../styles/Main.module.scss'

export default function Main() {
  const { isAuth, user } = useSelector(state => state.auth)
  
  return (
    <Suspense fallback={<Loader />}>
      <main className={styles.main}>
        <Scrollbars autoHide autoHeight autoHeightMax={'calc(100vh - 3.3rem)'}>
          <Switch>
            {adminRoutes.map(({ path, Component, exact }) => (
              <PrivateRoute key={path} path={path} component={Component} on={user.role === 'ADMIN'} redirectTo={path} exact={exact} />
            ))}

            {authRoutes.map(({ path, Component, exact }) => (
              <PrivateRoute key={path} path={path} component={Component} on={isAuth} redirectTo={path} exact={exact} />
            ))}

            {unAuthRoutes.map(({ path, Component, exact }) => (
              <PrivateRoute key={path} path={path} component={Component} on={!isAuth} redirectTo={'/'} exact={exact} />
            ))}

            {defaultRoutes.map(({ path, Component, exact }) => (
              <Route key={path} path={path} component={Component} exact={exact} />
            ))}
          </Switch>
        </Scrollbars>
      </main>
    </Suspense>
  )
}
