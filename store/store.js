import { createStore, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['isLoggedIn', 'token', 'user', 'userFavoriteRooms']
  };
const reducer = combineReducers({
    userReducer: persistReducer(persistConfig, userReducer)
});
export default store = createStore(reducer, applyMiddleware(thunk))

export const persistor = persistStore(store);