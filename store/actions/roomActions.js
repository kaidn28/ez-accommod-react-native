import roomServices from '../../api/services/roomServices'

import axios from '../../api/axiosInstance'

export const ADD_FAV_ROOM = 'ADD_FAV_ROOM'
export const DEL_FAV_ROOM = 'DEL_FAV_ROOM'
export const ASSIGN_FAV_ROOM = 'ASSIGN_FAV_ROOM'

export const assignFavRoom = (payload) => ({type: ASSIGN_FAV_ROOM, payload})

export const addFavRoom = (payload) => ({type: ADD_FAV_ROOM, payload})

export const delFavRoom = (payload) => ({type: DEL_FAV_ROOM, payload})