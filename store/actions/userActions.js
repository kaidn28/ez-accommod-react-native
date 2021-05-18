import userServices from "../../api/services/userServices"

import { assignFavRoom } from './roomActions'

export const UPDATE_INFOR = 'UPDATE_INFOR'
export const LOG_IN = 'LOG_IN'
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE'
export const GET_USER = 'GET_USER'
export const GET_USER_DATA = 'GET_USER_DATA'
export const LOG_OUT = 'LOG_OUT'

export const updateInfor = (payload) => ({type: UPDATE_INFOR, payload})

export const setLoginState = (loginData) => {
    return {
        type: SET_LOGIN_STATE,
        payload: loginData
    }
}
export const login = (payload) => {
    return async (dispatch) => {
        return userServices.login(payload)
                .then(res =>{
                    dispatch(setLoginState(res.data.data))
                    dispatch(assignFavRoom(res.data.data.user.favoriteRoom))
                })
                .catch(err => console.log(err))   
    }
}

export const logout = () => ({type: LOG_OUT})