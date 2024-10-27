import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import sliceBarang from "./sliceBarang";
import localforage from "localforage";

const reducer = combineReducers({
    barang: sliceBarang,
})

const persistConfig = {
    key: 'root',
    storage: localforage
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: false
            }),
        ]
    }
);
const persistor = persistStore(store);

export { store, persistor };