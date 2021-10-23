import { useEffect } from 'react'
import useFetch from './useFetch'
import useActions from '../useActions'

import socket from '../../API/socket'
import BasketService from '../../services/BasketService'

export function useGetBasket() {
  const { execute, loading, data, message, error } = useFetch(BasketService.getBasket)
  const { setBasket } = useActions()

  const getBasket = async basket_id => await execute(basket_id)

  useEffect(() => {
    if (data) setBasket(data)
  }, [data])

  return { getBasket, data, loading, message, error }
}

export function useAddBasketItem() {
  const addBasketItem = ({ basket_id, product_id, amount }) => socket.emit('user/basket:add', { basket_id, product_id, amount })
  return { addBasketItem }
}
export function useDeleteBasketItem() {
  const deleteBasketItem = ({ basket_id, product_id }) => socket.emit('user/basket:delete', { basket_id, product_id })
  return { deleteBasketItem }
}
export function useEditBasketItem() {
  const editBasketItem = ({ basket_id, product_id, amount }) => socket.emit('user/basket:edit', { basket_id, product_id, amount })
  return { editBasketItem }
}

export function useBasketSubscription() {
  const { addBasketItem, removeBasketItem } = useActions()

  useEffect(() => {
    socket.on('user/basket:added', data => addBasketItem(data))
    socket.on('user/basket:deleted', data => removeBasketItem(data))

    return () => {
      socket.off('user/basket:added')
      socket.off('user/basket:deleted')
    }
  }, [])
}
