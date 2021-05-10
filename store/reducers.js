import defaultState from './state'
import { SET_LOGIN_STATE } from './actions'
function reducer(state = defaultState, action) {
    //console.log(state)
    switch (action.type) {
    case SET_LOGIN_STATE:
        //console.log(action.payload)
        console.log(state)
        return {...state, ...action.payload, isLoggedIn: true}
    default:
        //console.log(state)
        return state
    }
}

export default reducer