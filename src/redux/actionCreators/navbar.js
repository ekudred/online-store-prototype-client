import { falseCoord, trueCoord } from '../reducers/navbarReducer'
import { NavbarTypes } from '../types'

export const showNavbar = bool => {
    return dispatch => {
        if (bool) {
            dispatch(swipeNavbar(trueCoord))
        } else {
            dispatch(swipeNavbar(falseCoord))
        }

        dispatch({
            type: NavbarTypes.SHOW_NAVBAR,
            payload: bool
        })
    }
}

export const swipeNavbar = coord => {
    return dispatch => {
        dispatch({
            type: NavbarTypes.SWIPE_NAVBAR,
            payload: coord
        })
    }
}