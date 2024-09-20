import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchGenres, createGenre, updateGenre, deleteGenre } from '../../api/genreApi';
import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  createGenreRequest,
  createGenreSuccess,
  createGenreFailure,
  updateGenreRequest,
  updateGenreSuccess,
  updateGenreFailure,
  deleteGenreRequest,
  deleteGenreSuccess,
  deleteGenreFailure,
} from '../slices/genreSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IGenre } from '../../types';

// Worker Saga: Fetch genres
function* handleFetchGenres() {
  try {
    const data: IGenre[] = yield call(fetchGenres);
    yield put(fetchGenresSuccess(data));
  } catch (error: any) {
    yield put(fetchGenresFailure(error.message));
  }
}

// Worker Saga: Create genre
function* handleCreateGenre(action: PayloadAction<{ name: string }>) {
  try {
    const newGenre: IGenre = yield call(createGenre, action.payload);
    yield put(createGenreSuccess(newGenre));
  } catch (error: any) {
    yield put(createGenreFailure(error.message));
  }
}

// Worker Saga: Update genre
function* handleUpdateGenre(action: PayloadAction<{ _id: string; name: string }>) {
  try {
    const updatedGenre: IGenre = yield call(updateGenre, action.payload._id, { name: action.payload.name });
    yield put(updateGenreSuccess(updatedGenre));
  } catch (error: any) {
    yield put(updateGenreFailure(error.message));
  }
}

// Worker Saga: Delete genre
function* handleDeleteGenre(action: PayloadAction<string>) {
  try {
    yield call(deleteGenre, action.payload);
    yield put(deleteGenreSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteGenreFailure(error.message));
  }
}

// Watcher Saga: Watch for all genre-related actions
export default function* genreSaga() {
  yield takeLatest(fetchGenresRequest.type, handleFetchGenres);
  yield takeLatest(createGenreRequest.type, handleCreateGenre);
  yield takeLatest(updateGenreRequest.type, handleUpdateGenre);
  yield takeLatest(deleteGenreRequest.type, handleDeleteGenre);
}
