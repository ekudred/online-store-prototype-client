import { ShopTypes } from '../types'

const initialState = {
  product: {},
  products: [],
  totalCount: 0,
  skip: 0,
  limit: 10,
  filter: {
    type: null,
    brand: null,
  },
  types: [],
  brands: [],
}

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShopTypes.SET_PRODUCT:
      return { ...state, product: action.payload }

    case ShopTypes.SET_PRODUCTS:
      return { ...state, products: [...state.products, ...action.payload] }
    case ShopTypes.CLEAR_PRODUCTS:
      return { ...state, products: [], skip: 0 }
    case ShopTypes.SET_FILTER:
      return { ...state, filter: { ...state.filter, ...action.payload } }
    case ShopTypes.SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload }
    case ShopTypes.SET_SKIP_PRODUCTS:
      return { ...state, skip: state.skip + action.payload }

    case ShopTypes.SET_TYPES:
      return { ...state, types: action.payload }
    case ShopTypes.SET_BRANDS:
      return { ...state, brands: action.payload }
    default:
      return state
  }
}

export default shopReducer
