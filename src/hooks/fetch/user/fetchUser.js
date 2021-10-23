import { useEffect } from 'react'

import useActions from '../../useActions'

import socket from '../../../API/socket'

export function useEditAvatar() {
  const editAvatar = img => socket.emit('user/avatar:edit', img)
  return { editAvatar }
}

export function useUserSubscription() {
  const { setAvatar } = useActions()

  useEffect(() => {
    socket.on('user/avatar:edited', data => setAvatar(data))

    return () => {
      socket.off('user/avatar:edited')
    }
  }, [])
}
