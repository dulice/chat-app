import { configureStore } from "@reduxjs/toolkit";
import userApi from "../services/UserApi";
import userSlice from "./userSlice";

//persist store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";

const reducer = combineReducers({
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [userApi.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, userApi.middleware],
});

export default store;