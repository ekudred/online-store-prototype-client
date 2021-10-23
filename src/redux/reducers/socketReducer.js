import { SocketTypes } from '../types'

const initialState = {
  socket: {},
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SocketTypes.SOCKET_INIT:
      return { ...state, socket: action.payload }
    default:
      return state
  }
}

export default socketReducer
