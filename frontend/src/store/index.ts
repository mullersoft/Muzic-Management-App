import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./slices/songSlice";
import artistReducer from "./slices/artistSlice";
import albumReducer from "./slices/albumSlice";
import genreReducer from "./slices/genreSlice";

const store = configureStore({
  reducer: {
    songs: songReducer,
    artists: artistReducer,
    albums: albumReducer,
    genres: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
