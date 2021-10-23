import { AuthTypes } from '../types'

export const setAuth = bool => dispatch => dispatch({ type: AuthTypes.SET_AUTH, payload: bool })
export const setUser = state => dispatch => dispatch({ type: AuthTypes.SET_USER, payload: state })
export const setAvatar = state => dispatch => dispatch({ type: AuthTypes.SET_AVATAR, payload: state })
