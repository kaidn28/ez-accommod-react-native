import { createStore, applyMiddleware } from 'redux'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux'
//persist redux config

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [], //saved
    //blacklist: [] //not saved
  };
const reducer = combineReducers({
    userReducer: persistReducer(persistConfig, userReducer)
});
export default store = createStore(reducer, applyMiddleware(thunk))

export const persistor = persistStore(store);