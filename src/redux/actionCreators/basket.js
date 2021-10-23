import { BasketTypes } from '../types'

export const setBasket = payload => dispatch => dispatch({ type: BasketTypes.SET_BASKET, payload })
export const addBasketItem = payload => dispatch => dispatch({ type: BasketTypes.ADD_BASKET_ITEM, payload })
export const removeBasketItem = payload => dispatch => dispatch({ type: BasketTypes.DELETE_BASKET_ITEM, payload })
export const editBasketItem = payload => dispatch => dispatch({ type: BasketTypes.EDIT_BASKET_ITEM, payload })
