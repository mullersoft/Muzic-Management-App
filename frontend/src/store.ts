import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import albumReducer from './features/slices/albumSlice';
import albumSaga from './features/sagas/albumSaga';
import artistReducer from './features/slices/artistSlice';
import artistSaga from './features/sagas/artistSaga';
import genreReducer from './features/slices/genreSlice'; 
import genreSaga from './features/sagas/genreSaga'; 
import songReducer from './features/slices/songSlice';
import songSaga from './features/sagas/songSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    artists: artistReducer,
    genres: genreReducer,
    songs: songReducer, // Add song reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(albumSaga);
sagaMiddleware.run(artistSaga);
sagaMiddleware.run(genreSaga);
sagaMiddleware.run(songSaga); // Run the song saga

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
