import { AdminTypes } from '../types'

export const setAdminProducts = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_PRODUCTS, payload })
export const setAdminProduct = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_PRODUCT, payload })
export const deleteAdminProduct = payload => dispatch => dispatch({ type: AdminTypes.DELETE_ADMIN_PRODUCT, payload })
export const editAdminProduct = payload => dispatch => dispatch({ type: AdminTypes.EDIT_ADMIN_PRODUCT, payload })
export const setSkipAdminProducts = payload => dispatch => dispatch({ type: AdminTypes.SET_SKIP_ADMIN_PRODUCTS, payload })
export const setTotalCountAdminProducts = payload => dispatch => dispatch({ type: AdminTypes.SET_TOTAL_ADMIN_PRODUCTS_COUNT, payload })

// ==========

export const setAdminUsers = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_USERS, payload })
export const setAdminUser = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_USER, payload })
export const deleteAdminUser = payload => dispatch => dispatch({ type: AdminTypes.DELETE_ADMIN_USER, payload })
export const editAdminUser = payload => dispatch => dispatch({ type: AdminTypes.EDIT_ADMIN_USER, payload })
export const setSkipAdminUsers = payload => dispatch => dispatch({ type: AdminTypes.SET_SKIP_ADMIN_USERS, payload })
export const setTotalCountAdminUsers = payload => dispatch => dispatch({ type: AdminTypes.SET_TOTAL_ADMIN_USERS_COUNT, payload })

// ==========

export const setAdminTypes = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_TYPES, payload })
export const setAdminType = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_TYPE, payload })
export const deleteAdminType = payload => dispatch => dispatch({ type: AdminTypes.DELETE_ADMIN_TYPE, payload })
export const editAdminType = payload => dispatch => dispatch({ type: AdminTypes.EDIT_ADMIN_TYPE, payload })

// ==========

export const setAdminBrands = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_BRANDS, payload })
export const setAdminBrand = payload => dispatch => dispatch({ type: AdminTypes.SET_ADMIN_BRAND, payload })
export const deleteAdminBrand = payload => dispatch => dispatch({ type: AdminTypes.DELETE_ADMIN_BRAND, payload })
export const editAdminBrand = payload => dispatch => dispatch({ type: AdminTypes.EDIT_ADMIN_BRAND, payload })
