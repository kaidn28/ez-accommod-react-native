import defaultState from './state'
import { SET_LOGIN_STATE, ADD_FAV_ROOM, DEL_FAV_ROOM } from './actions'

const addFavRoom = (prevFavRoomList, newFavRoom) => {
    if (!prevFavRoomList.find(newFavRoom)) {
        return prevFavRoomList
    }
    return state.userFavoriteRooms.concat(newFavRoom)
}

function reducer(state = defaultState, action) {
    //console.log(state)
    switch (action.type) {
        case SET_LOGIN_STATE:
            //console.log(action.payload)
            console.log(state)
            return {
                ...state, 
                ...action.payload, 
                userFavoriteRooms: action.payload.user.favoriteRoom, 
                isLoggedIn: true
            }
        case ADD_FAV_ROOM:
            return {
                ...state,
                userFavoriteRooms: addFavRoom(state.userFavoriteRoom, action.payload.roomId)
            }
        case DEL_FAV_ROOM:
            return {
                ...state,
                userFavoriteRooms: state.userFavoriteRooms.filter(e => e != action.payload.roomId)
            }
        default:
            //console.log(state)
            return state
    }
}

export default reducer