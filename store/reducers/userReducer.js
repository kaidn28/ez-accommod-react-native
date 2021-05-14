import defaultState from '../states/userState'
import { SET_LOGIN_STATE } from '../actions/userActions'

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOGIN_STATE:
            return {
                ...state, 
                ...action.payload,
                isLoggedIn: true
            }     
        default:
            return state
    }
}

export default userReducer