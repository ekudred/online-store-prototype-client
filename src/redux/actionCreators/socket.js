import socket from '../../API/socket'
import { SocketTypes } from '../types'

export const socketInit = () => dispatch => dispatch({ type: SocketTypes.SOCKET_INIT, payload: socket })
