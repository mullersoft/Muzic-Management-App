// src/features/slices/albumSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album } from '../../types';

interface AlbumState {
  albums: Album[];
}

const initialState: AlbumState = {
  albums: [],
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    fetchAlbumsStart: (state) => {},
    fetchAlbumsSuccess: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    fetchAlbumsFailure: (state, action: PayloadAction<string>) => {},
    createAlbumStart: (state, action: PayloadAction<Omit<Album, '_id' | 'createdAt' | 'updatedAt'>>) => {},
    createAlbumSuccess: (state, action: PayloadAction<Album>) => {
      state.albums.push(action.payload);
    },
    createAlbumFailure: (state, action: PayloadAction<string>) => {},
    updateAlbumStart: (state, action: PayloadAction<{ id: string; data: Omit<Album, '_id' | 'createdAt' | 'updatedAt'> }>) => {},
    updateAlbumSuccess: (state, action: PayloadAction<Album>) => {
      const index = state.albums.findIndex(album => album._id === action.payload._id);
      if (index !== -1) {
        state.albums[index] = action.payload;
      }
    },
    updateAlbumFailure: (state, action: PayloadAction<string>) => {},
    deleteAlbumStart: (state, action: PayloadAction<string>) => {},
    deleteAlbumSuccess: (state, action: PayloadAction<string>) => {
      state.albums = state.albums.filter(album => album._id !== action.payload);
    },
    deleteAlbumFailure: (state, action: PayloadAction<string>) => {},
  },
});

export const {
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
} = albumSlice.actions;

export default albumSlice.reducer;
