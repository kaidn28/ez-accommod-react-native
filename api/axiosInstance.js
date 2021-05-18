import {
    BASE_URL
} from './apiUrl'

import store from '../store/store'
import axios from 'axios'

/*
*   Create only one axios instance throughout the whole app.
*   Only use this. 
*   No need to explicitly import axios.
*/

const instance = axios.create({
    baseURL: BASE_URL
})

instance.interceptors.request.use(
    function(config) {
        const state = store.getState()
      const token = state.userReducer.token
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
);

export default instance