import defaultState from "../states/roomState";

import { ADD_FAV_ROOM, DEL_FAV_ROOM, ASSIGN_FAV_ROOM } from "../actions/roomActions";

const addFavRoom = (prevFavRoomList, newFavRoom) => {
  if (!prevFavRoomList || !prevFavRoomList.find(room => room == newFavRoom)) {
      return prevFavRoomList
  }
  return prevFavRoomList.concat(newFavRoom)
}

function roomReducer(state = defaultState, action) {
  switch (action.type) {
    case ASSIGN_FAV_ROOM:
      return {
        ...state,
        userFavoriteRooms: action.payload
      }

    case ADD_FAV_ROOM:
      /*
       *   Concatenate new favorite room to existed array
       */
      return {
        ...state,
        userFavoriteRooms: addFavRoom(
          state.userFavoriteRooms,
          action.payload.roomId
        ),
      };

    case DEL_FAV_ROOM:
      /*
       *   Delete one from array
       *   by filter only rooms having roomID dont match with the removed one
       */
      return {
        ...state,
        userFavoriteRooms: state.userFavoriteRooms.filter(
          (e) => e != action.payload.roomId
        ),
      };
    default:
      return state;
  }
}

export default roomReducer;
