import io from 'socket.io-client'
import { SERVER_URL } from '../config'

const socket = io(SERVER_URL, {
  auth: {
    accessToken: localStorage.getItem('accessToken') || null,
  },
})

export default socket
