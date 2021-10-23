import { AuthTypes } from '../types'

const initialState = {
  user: {},
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.SET_AUTH:
      return { ...state, isAuth: action.payload }
    case AuthTypes.SET_USER:
      return { ...state, user: action.payload }
    case AuthTypes.SET_AVATAR:
      return { ...state, user: { ...state.user, avatar: action.payload } }
    default:
      return state
  }
}

export default authReducer
