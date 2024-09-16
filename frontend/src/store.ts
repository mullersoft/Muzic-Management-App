// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import albumReducer from "./features/slices/albumSlice";
import albumSaga from "./features/sagas/albumSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    albums: albumReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(albumSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
