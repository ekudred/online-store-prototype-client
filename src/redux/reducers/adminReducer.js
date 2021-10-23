import { AdminTypes } from '../types'

const initialState = {
  products: [],
  users: [],
  totalCount: {
    products: 0,
    users: 0,
  },
  skip: {
    products: 0,
    users: 0,
  },
  limit: {
    products: 10,
    users: 10,
  },
  types: [],
  brands: [],
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminTypes.SET_ADMIN_PRODUCTS:
      return { ...state, products: [...state.products, ...action.payload] }
    case AdminTypes.SET_ADMIN_PRODUCT:
      return {
        ...state,
        products:
          state.products.length === state.skip.products && state.products.length < state.totalCount.products
            ? [action.payload, ...state.products.slice(0, -1)]
            : [action.payload, ...state.products],
        totalCount: { ...state.totalCount, products: state.totalCount.products + 1 },
      }
    case AdminTypes.DELETE_ADMIN_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => !action.payload.some(item => item._id === product._id)),
        skip: { ...state.skip, products: state.skip.products - action.payload.length },
        totalCount: { ...state.totalCount, products: state.totalCount.products - action.payload.length },
      }
    case AdminTypes.EDIT_ADMIN_PRODUCT:
      return { ...state, products: state.products.map(item => (item._id === action.payload._id ? (item = action.payload) : item)) }
    case AdminTypes.SET_TOTAL_ADMIN_PRODUCTS_COUNT:
      return { ...state, totalCount: { ...state.totalCount, products: action.payload } }
    case AdminTypes.SET_SKIP_ADMIN_PRODUCTS:
      return { ...state, skip: { ...state.skip, products: state.skip.products + action.payload } }

    case AdminTypes.SET_ADMIN_USERS:
      return { ...state, users: [...action.payload, ...state.users] }
    case AdminTypes.SET_ADMIN_USER:
      return {
        ...state,
        users:
          state.users.length === state.skip.users && state.users.length < state.totalCount.users
            ? [action.payload, ...state.users.slice(0, -1)]
            : [action.payload, ...state.users],
        totalCount: { ...state.totalCount, users: state.totalCount.users + 1 },
      }
    case AdminTypes.DELETE_ADMIN_USER:
      return {
        ...state,
        users: state.users.filter(user => !action.payload.some(item => item._id === user._id)),
        skip: { ...state.skip, users: state.skip.users - action.payload.length },
        totalCount: { ...state.totalCount, users: state.totalCount.users - 1 },
      }
    case AdminTypes.EDIT_ADMIN_USER:
      return { ...state, users: state.users.map(item => (item._id === action.payload._id ? (item = action.payload) : item)) }
    case AdminTypes.SET_TOTAL_ADMIN_USERS_COUNT:
      return { ...state, totalCount: { ...state.totalCount, users: action.payload } }
    case AdminTypes.SET_SKIP_ADMIN_USERS:
      return { ...state, skip: { ...state.skip, users: state.skip.users + action.payload } }

    case AdminTypes.SET_ADMIN_TYPES:
      return { ...state, types: action.payload }
    case AdminTypes.SET_ADMIN_TYPE:
      return { ...state, types: [...state.types, action.payload] }
    case AdminTypes.DELETE_ADMIN_TYPE:
      return { ...state, types: state.types.filter(type => !action.payload.some(item => item._id === type._id)) }
    case AdminTypes.EDIT_ADMIN_TYPE:
      return { ...state, types: state.types.map(item => (item._id === action.payload._id ? (item = action.payload) : item)) }

    case AdminTypes.SET_ADMIN_BRANDS:
      return { ...state, brands: action.payload }
    case AdminTypes.SET_ADMIN_BRAND:
      return { ...state, brands: [...state.brands, action.payload] }
    case AdminTypes.DELETE_ADMIN_BRAND:
      return { ...state, brands: state.brands.filter(brand => !action.payload.some(item => item._id === brand._id)) }
    case AdminTypes.EDIT_ADMIN_BRAND:
      return { ...state, brands: state.brands.map(item => (item._id === action.payload._id ? (item = action.payload) : item)) }

    default:
      return state
  }
}

export default adminReducer
