import { lazy } from 'react'

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

import { DefaultRoutesConstants, UnAuthRoutesConstants, AuthRoutesConstants, AdminRoutesConstants } from './utils/constants'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const BasketPage = lazy(() => import('./pages/BasketPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

export const defaultRoutes = [
  { path: DefaultRoutesConstants.HOME_ROUTE, Component: HomePage, exact: true },
  { path: DefaultRoutesConstants.PRODUCTS_ROUTE, Component: ProductsPage, exact: true },
  { path: DefaultRoutesConstants.PRODUCT_ROUTE, Component: ProductPage, exact: true },
  { path: DefaultRoutesConstants.NOT_FOUND_ROUTE, Component: NotFoundPage, exact: true },
]

export const unAuthRoutes = [
  { path: UnAuthRoutesConstants.LOGIN_ROUTE, Component: LoginPage, exact: true },
  { path: UnAuthRoutesConstants.REGISTRATION_ROUTE, Component: RegistrationPage, exact: true },
]

export const authRoutes = [
  { path: AuthRoutesConstants.PROFILE_ROUTE, Component: ProfilePage, exact: true },
  { path: AuthRoutesConstants.BASKET_ROUTE, Component: BasketPage, exact: true },
]

export const adminRoutes = [{ path: AdminRoutesConstants.ADMIN_ROUTE, Component: AdminPage, exact: true }]
