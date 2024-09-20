import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISong } from '../../types';

interface SongState {
  songs: ISong[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SongState = {
  songs: [],
  status: 'idle',
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.status = 'loading';
    },
    fetchSongsSuccess: (state, action: PayloadAction<ISong[]>) => {
      state.songs = action.payload;
      state.status = 'idle';
    },
    fetchSongsFailure: (state) => {
      state.status = 'failed';
    },
    addSong: (state, action: PayloadAction<ISong>) => {
      state.songs.push(action.payload);
    },
    updateSong: (state, action: PayloadAction<ISong>) => {
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    deleteSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
} = songSlice.actions;

export default songSlice.reducer;
