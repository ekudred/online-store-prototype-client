import { useEffect } from 'react'
import useFetch from './useFetch'

import useActions from '../useActions'

import socket from '../../API/socket'
import ProductService from '../../services/ProductService'
import TypeService from '../../services/TypeService'
import BrandService from '../../services/BrandService'

export function useGetProducts() {
  const { execute, loading, data, message, error } = useFetch(ProductService.getProducts)
  const getProducts = async ({ type_id, brand_id, limit, skip }) => await execute({ type_id, brand_id, limit, skip })
  return { getProducts, data, loading, message, error }
}
export function useGetProduct() {
  const { execute, loading, data, message, error } = useFetch(ProductService.getProduct)
  const { setProduct } = useActions()

  const getProduct = async id => await execute(id)

  useEffect(() => {
    if (data) setProduct(data)
  }, [data])

  return { getProduct, data, loading, message, error }
}
export function useGetAllTypes() {
  const { execute, loading, data, message, error } = useFetch(TypeService.getAll)
  const getAllTypes = async () => await execute()
  return { getAllTypes, data, loading, message, error }
}
export function useGetAllBrands() {
  const { execute, loading, data, message, error } = useFetch(BrandService.getAll)
  const getAllBrands = async () => await execute()
  return { getAllBrands, data, loading, message, error }
}

export function useGetRating() {
  const { execute, loading, data, message, error } = useFetch(ProductService.getRating)
  const getRating = async id => await execute(id)
  return { getRating, data, loading, message, error }
}
export function useGetRate() {
  const { execute, loading, data, message, error } = useFetch(ProductService.getRate)
  const getRate = async ({ user_id, product_id }) => await execute({ user_id, product_id })
  return { getRate, data, loading, message, error }
}
export function useAddRate() {
  const addRate = ({ user_id, product_id, rate }) => socket.emit('user/product/rate:add', { user_id, product_id, rate })
  return { addRate }
}
export function useUpdateRatingSubscription(setRating, id) {
  useEffect(() => {
    socket.on('user/product/rating:update', data => {
      if (data.product_id === id) setRating(data.rating)
    })

    return () => socket.off('user/product/rating:update')
  }, [])
}

export function useFindPopularProducts() {
  const { execute, loading, data, message, error } = useFetch(ProductService.findPopular)
  const findPopularProducts = async amount => await execute(amount)
  return { findPopularProducts, data, loading, message, error }
}
