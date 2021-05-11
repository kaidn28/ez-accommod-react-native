import {
    BASE_URL,
    API_SIGNUP,
    API_LOGIN,
    API_LOGIN_FACEBOOK,
    API_GET_NOTIF,
    API_READ_ALL_NOTIF,
    API_USER
} from '../apiUrl'

import axios from 'axios'
axios.defaults.baseURL = BASE_URL

export default {
    signup (payload) {
        return axios.post(API_SIGNUP, payload)
    },

    login (payload) {
        return axios.post(API_LOGIN, payload)
    },

    getUserProfile (payload) {
        // return axios.get(API_GET_ROOM_LIST)
        console.log(`${API_USER}/${payload.id}`)
        console.log(`Bearer ${payload.token}`)
        return axios.get(`${API_USER}/${payload.id}`, {headers: {Authorization: `Bearer ${payload.token}`}})
    },

    loginWithFacebook (payload) {
        return axios.post(API_LOGIN_FACEBOOK, payload)
    },

    getNotif () {
        return axios.get(API_GET_NOTIF)
    },

    readNotif ({ id }) {
        return axios.get(`${API_GET_NOTIF}/${id}`)
    },

    readAllNotif (payload) {
        return axios.post(API_READ_ALL_NOTIF, payload)
    }
}


