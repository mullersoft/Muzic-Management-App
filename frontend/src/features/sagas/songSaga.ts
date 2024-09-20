// src/features/sagas/songSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, addSong, updateSong, deleteSong } from '../slices/songSlice';
import { fetchSongsApi, createSongApi, updateSongApi, deleteSongApi } from '../../api/songApi';
import { ISong } from '../../types';

function* fetchSongs() {
  try {
    const songs: ISong[] = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(songs));
  } catch (e) {
    yield put(fetchSongsFailure());
  }
}

function* createSong(action: ReturnType<typeof addSong>) {
  try {
    const newSong: ISong = yield call(createSongApi, action.payload);
    yield put(fetchSongsRequest());
  } catch (e) {
    console.error('Error creating song:', e);
  }
}

function* editSong(action: ReturnType<typeof updateSong>) {
  try {
    // Destructure action.payload and ensure it matches Omit<ISong, '_id'>
    const { _id, ...updatedSong } = action.payload as { _id: string } & Omit<ISong, '_id'>;

    // Call the API by passing the function and its arguments separately
    const result: ISong = yield call(updateSongApi, _id, updatedSong);
    
    // After successful update, fetch the updated list of songs
    yield put(fetchSongsRequest());
  } catch (e) {
    console.error('Error updating song:', e);
  }
}

function* removeSong(action: ReturnType<typeof deleteSong>) {
  try {
    yield call(deleteSongApi, action.payload); // Ensure the delete API is called correctly with the song ID
    yield put(fetchSongsRequest());
  } catch (e) {
    console.error('Error deleting song:', e);
  }
}

export default function* songSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
  yield takeEvery(addSong.type, createSong);
  yield takeEvery(updateSong.type, editSong);
  yield takeEvery(deleteSong.type, removeSong);
}
