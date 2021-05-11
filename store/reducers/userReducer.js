import defaultState from '../states/state'
import { SET_LOGIN_STATE, ADD_FAV_ROOM, DEL_FAV_ROOM } from '../actions/userActions'

function userReducer(state = defaultState, action) {
    console.log(state)
    switch (action.type) {
        case SET_LOGIN_STATE:
            //console.log(action.payload)
            //console.log(state)
            /*
            *   Set user, token and user favorite rooms into state.
            *   userFavoriteRooms is set for further convenience.
            */
            return {
                ...state, 
                ...action.payload, 
                userFavoriteRooms: action.payload.user.favoriteRoom, 
                isLoggedIn: true
            }
            case ADD_FAV_ROOM:
                /*
                *   Concatenate new favorite room to existed array
                */
                return {
                    ...state,
                    userFavoriteRooms: addFavRoom(state.userFavoriteRoom, action.payload.roomId)
                }
            case DEL_FAV_ROOM:
                /*
                *   Delete one from array
                *   by filter only rooms having roomID dont match with the removed one
                */
                return {
                    ...state,
                    userFavoriteRooms: state.userFavoriteRooms.filter(e => e != action.payload.roomId)
                }        
        default:
            //console.log(state)
            return state
    }
}

export default userReducer