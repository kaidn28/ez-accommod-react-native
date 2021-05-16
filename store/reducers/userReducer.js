import defaultState from '../states/userState'
import { SET_LOGIN_STATE, LOG_OUT } from '../actions/userActions'

function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOGIN_STATE:
            return {
                ...state, 
                ...action.payload,
                isLoggedIn: true
            }     
        case LOG_OUT:
            //console.log(state)
            return defaultState
        default:
            return state
    }
}

export default userReducer