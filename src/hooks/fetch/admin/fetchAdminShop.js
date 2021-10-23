import { useEffect } from 'react'

import useActions from '../../useActions'
import socket from '../../../API/socket'

export function useCreateProduct() {
  // name, type_id, brand_id, price, img
  const createProduct = product => {
    console.log(product)
    socket.emit('admin/product:create', { ...product })}
  return { createProduct }
}
export function useDeleteProduct() {
  const deleteProduct = products => socket.emit('admin/product:delete', { products })
  return { deleteProduct }
}
export function useEditProduct() {
  const editProduct = product => socket.emit('admin/product:edit', { product })
  return { editProduct }
}

// ==========

export function useCreateType() {
  const createType = name => socket.emit('admin/type:create', { name })
  return { createType }
}
export function useDeleteType() {
  const deleteType = types => socket.emit('admin/type:delete', { types })
  return { deleteType }
}
export function useEditType() {
  const editType = type => socket.emit('admin/type:edit', { type })
  return { editType }
}

// ==========

export function useCreateBrand() {
  const createBrand = name => socket.emit('admin/brand:create', { name })
  return { createBrand }
}
export function useDeleteBrand() {
  const deleteBrand = brands => socket.emit('admin/brand:delete', { brands })
  return { deleteBrand }
}
export function useEditBrand() {
  const editBrand = brand => socket.emit('admin/brand:edit', { brand })
  return { editBrand }
}

// ==========

export function useAdminShopSubscription() {
  const {
    setAdminProduct,
    deleteAdminProduct,
    editAdminProduct,
    setAdminType,
    deleteAdminType,
    editAdminType,
    setAdminBrand,
    deleteAdminBrand,
    editAdminBrand,
  } = useActions()

  useEffect(() => {
    socket.on('admin/product:created', data => {
      console.log(data)
      setAdminProduct(data)})
    socket.on('admin/product:deleted', data => deleteAdminProduct(data))
    socket.on('admin/product:edited', data => editAdminProduct(data))

    socket.on('admin/type:created', data => setAdminType(data))
    socket.on('admin/type:deleted', data => deleteAdminType(data))
    socket.on('admin/type:edited', data => editAdminType(data))

    socket.on('admin/brand:created', data => setAdminBrand(data))
    socket.on('admin/brand:deleted', data => deleteAdminBrand(data))
    socket.on('admin/brand:edited', data => editAdminBrand(data))

    return () => {
      socket.off('admin/product:created')
      socket.off('admin/product:deleted')
      socket.off('admin/product:edited')

      socket.off('admin/type:created')
      socket.off('admin/type:deleted')
      socket.off('admin/type:edited')

      socket.off('admin/brand:created')
      socket.off('admin/brand:deleted')
      socket.off('admin/brand:edited')
    }
  }, [socket])
}
