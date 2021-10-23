import { NavbarTypes } from '../types'

export const falseCoord = -240
export const trueCoord = 0

const initialState = {
    isShow: false,
    coordX: falseCoord,
}

const navbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case NavbarTypes.SHOW_NAVBAR:
            return { ...state, isShow: action.payload }
        case NavbarTypes.SWIPE_NAVBAR:
            return { ...state, coordX: action.payload }
        default:
            return state
    }
}

export default navbarReducer
