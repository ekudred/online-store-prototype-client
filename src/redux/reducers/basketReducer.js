import { BasketTypes } from '../types'

const initialState = {
  basket: [],
}

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case BasketTypes.SET_BASKET:
      return { ...state, basket: action.payload }
    case BasketTypes.ADD_BASKET_ITEM:
      return { ...state, basket: [...state.basket, action.payload] }
    case BasketTypes.DELETE_BASKET_ITEM:
      return { ...state, basket: state.basket.filter(item => item.product._id !== action.payload) }
    case BasketTypes.EDIT_BASKET_ITEM:
      return {
        ...state,
        basket: state.basket.map(item =>
          item.product._id === action.payload.product_id
            ? { ...item, amount: action.payload.amount, price: action.payload.amount * item.product.price }
            : item
        ),
      }
    default:
      return state
  }
}

export default basketReducer
