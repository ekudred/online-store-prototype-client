import { combineReducers } from 'redux'

import socketReducer from './reducers/socketReducer'
import authReducer from './reducers/authReducer'
import basketReducer from './reducers/basketReducer'
import shopReducer from './reducers/shopReducer'
import adminReducer from './reducers/adminReducer'
import navbarReducer from './reducers/navbarReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
  admin: adminReducer,
  basket: basketReducer,
  shop: shopReducer,
  navbar: navbarReducer,
})

export default rootReducer
