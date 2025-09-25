"use client";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import orderReducer from "./slices/orderSlice";
import partnerReducer from "./slices/partnerSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        partners: partnerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
