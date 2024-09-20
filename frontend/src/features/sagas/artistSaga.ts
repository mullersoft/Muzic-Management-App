import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchArtists, createArtist, updateArtist, deleteArtist } from '../../api/artistApi';
import {
  fetchArtistsRequest,
  fetchArtistsSuccess,
  fetchArtistsFailure,
  createArtistRequest,
  createArtistSuccess,
  createArtistFailure,
  updateArtistRequest,
  updateArtistSuccess,
  updateArtistFailure,
  deleteArtistRequest,
  deleteArtistSuccess,
  deleteArtistFailure,
} from '../slices/artistSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { IArtist } from '../../types';

// Worker Saga: Fetch artists
function* handleFetchArtists() {
  try {
    const data: IArtist[] = yield call(fetchArtists);
    yield put(fetchArtistsSuccess(data));
  } catch (error: any) {
    yield put(fetchArtistsFailure(error.message));
  }
}

// Worker Saga: Create artist
function* handleCreateArtist(action: PayloadAction<{ name: string }>) {
  try {
    const newArtist: IArtist = yield call(createArtist, action.payload);
    yield put(createArtistSuccess(newArtist));
  } catch (error: any) {
    yield put(createArtistFailure(error.message));
  }
}

// Worker Saga: Update artist
function* handleUpdateArtist(action: PayloadAction<{ _id: string; name: string }>) {
  try {
    const updatedArtist: IArtist = yield call(updateArtist, action.payload._id, { name: action.payload.name });
    yield put(updateArtistSuccess(updatedArtist));
  } catch (error: any) {
    yield put(updateArtistFailure(error.message));
  }
}

// Worker Saga: Delete artist
function* handleDeleteArtist(action: PayloadAction<string>) {
  try {
    yield call(deleteArtist, action.payload);
    yield put(deleteArtistSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteArtistFailure(error.message));
  }
}

// Watcher Saga: Watch for all artist-related actions
export default function* artistSaga() {
  yield takeLatest(fetchArtistsRequest.type, handleFetchArtists);
  yield takeLatest(createArtistRequest.type, handleCreateArtist);
  yield takeLatest(updateArtistRequest.type, handleUpdateArtist);
  yield takeLatest(deleteArtistRequest.type, handleDeleteArtist);
}
