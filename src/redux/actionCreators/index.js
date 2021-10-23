import * as SocketActionCreators from './socket'
import * as AuthActionCreators from './auth'
import * as BasketActionCreators from './basket'
import * as ShopActionCreators from './shop'
import * as AdminActionCreators from './admin'
import * as NavbarActionCreators from './navbar'

const exportedObject = {
  ...AuthActionCreators,
  ...SocketActionCreators,
  ...BasketActionCreators,
  ...ShopActionCreators,
  ...AdminActionCreators,
  ...NavbarActionCreators,
}

export default exportedObject
