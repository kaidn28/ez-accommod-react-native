import userServices from "../../api/services/userServices"

export const UPDATE_INFOR = 'UPDATE_INFOR'
export const LOG_IN = 'LOG_IN'
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE'
export const GET_USER = 'GET_USER'
export const GET_USER_DATA = 'GET_USER_DATA'

export const ADD_FAV_ROOM = 'ADD_FAV_ROOM'
export const DEL_FAV_ROOM = 'DEL_FAV_ROOM'

export const updateInfor = (payload) => ({type: UPDATE_INFOR, payload})

export const setLoginState = (loginData) => {
    //console.log(loginData)
    return {
        type: SET_LOGIN_STATE,
        payload: loginData
    }
}
export const login = (payload) => {
    //console.log(email + '1')
    return async (dispatch) => {
        //console.log(email + '2')
        return userServices.login(payload)
                .then(res =>
                    dispatch(setLoginState(res.data.data))
                )
                .catch(err => console.log(err))   
    }
}