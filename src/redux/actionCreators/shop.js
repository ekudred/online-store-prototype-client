import { ShopTypes } from '../types'

export const setProducts = payload => dispatch => dispatch({ type: ShopTypes.SET_PRODUCTS, payload })
export const clearProducts = () => dispatch => dispatch({ type: ShopTypes.CLEAR_PRODUCTS })
export const setFilter = payload => dispatch => dispatch({ type: ShopTypes.SET_FILTER, payload })
export const setSkipProducts = payload => dispatch => dispatch({ type: ShopTypes.SET_SKIP_PRODUCTS, payload })
export const setTotalCountProducts = payload => dispatch => dispatch({ type: ShopTypes.SET_TOTAL_COUNT, payload })

// ==========

export const setProduct = payload => dispatch => dispatch({ type: ShopTypes.SET_PRODUCT, payload })

// ==========

export const setTypes = payload => dispatch => dispatch({ type: ShopTypes.SET_TYPES, payload })
export const setBrands = payload => dispatch => dispatch({ type: ShopTypes.SET_BRANDS, payload })
