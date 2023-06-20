import storage from 'redux-persist/lib/storage'
import userReducer from './userManagement'
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import { userLogin, userLogout, userRegister, userWholeSalerHome, userPersist } from "./userManagement"

export const actions = {
    user: { userLogin, userLogout, userRegister, userWholeSalerHome, userPersist },
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer