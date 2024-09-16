// src/features/sagas/albumSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAlbumsStart,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  createAlbumStart,
  createAlbumSuccess,
  createAlbumFailure,
  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumStart,
  deleteAlbumSuccess,
  deleteAlbumFailure,
} from '../slices/albumSlice';
import { fetchAlbums, createAlbum, updateAlbum, deleteAlbum } from '../../api/albumApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types';

function* fetchAlbumsSaga() {
  try {
    const albums: Album[] = yield call(fetchAlbums);
    yield put(fetchAlbumsSuccess(albums));
  } catch (error: any) {
    yield put(fetchAlbumsFailure(error.message));
  }
}

function* createAlbumSaga(action: PayloadAction<Omit<Album, '_id' | 'createdAt' | 'updatedAt'>>) {
  try {
    const newAlbum: Album = yield call(createAlbum, action.payload);
    yield put(createAlbumSuccess(newAlbum));
  } catch (error: any) {
    yield put(createAlbumFailure(error.message));
  }
}

function* updateAlbumSaga(action: PayloadAction<{ id: string; data: Omit<Album, '_id' | 'createdAt' | 'updatedAt'> }>) {
  try {
    const updatedAlbum: Album = yield call(updateAlbum, action.payload.id, action.payload.data);
    yield put(updateAlbumSuccess(updatedAlbum));
  } catch (error: any) {
    yield put(updateAlbumFailure(error.message));
  }
}

function* deleteAlbumSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteAlbum, action.payload);
    yield put(deleteAlbumSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteAlbumFailure(error.message));
  }
}

export default function* albumSaga() {
  yield takeLatest(fetchAlbumsStart.type, fetchAlbumsSaga);
  yield takeLatest(createAlbumStart.type, createAlbumSaga);
  yield takeLatest(updateAlbumStart.type, updateAlbumSaga);
  yield takeLatest(deleteAlbumStart.type, deleteAlbumSaga);
}
