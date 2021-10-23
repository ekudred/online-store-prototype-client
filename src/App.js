import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useCheckAuth from './hooks/fetch/auth/useCheckAuth'
import { useBasketSubscription, useGetBasket } from './hooks/fetch/fetchBasket'
import { useUserSubscription } from './hooks/fetch/user/fetchUser'

import Loader from './components/common/Loader'
import Header from './components/Header/index'
import Navbar from './components/Navbar/index'
import Main from './components/Main/Main'
import useActions from './hooks/useActions'

function App() {
  const { isAuth, user } = useSelector(state => state.auth)
  const { socketInit } = useActions()
  const { loading, checkAuth } = useCheckAuth()
  const { getBasket } = useGetBasket()

  useBasketSubscription()
  useUserSubscription()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) checkAuth()
    socketInit()
  }, [])

  useEffect(() => {
    if (isAuth) {
      getBasket(user.basket)
    }
  }, [user])

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Main />
    </BrowserRouter>
  )
}

export default App
