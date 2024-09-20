import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArtist } from '../../types';

interface ArtistState {
  artists: IArtist[];
  loading: boolean;
  error: string | null;
  editingArtist: IArtist | null;
  isEditing: boolean;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: null,
  editingArtist: null,
  isEditing: false,
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    fetchArtistsRequest: (state) => {
      state.loading = true;
    },
    fetchArtistsSuccess: (state, action: PayloadAction<IArtist[]>) => {
      state.loading = false;
      state.artists = action.payload;
    },
    fetchArtistsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createArtistRequest: (state, action: PayloadAction<{ name: string }>) => {
      state.loading = true;
    },
    createArtistSuccess: (state, action: PayloadAction<IArtist>) => {
      state.loading = false;
      state.artists.push(action.payload);
    },
    createArtistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateArtistRequest: (state, action: PayloadAction<{ _id: string; name: string }>) => {
      state.loading = true;
    },
    updateArtistSuccess: (state, action: PayloadAction<IArtist>) => {
      state.loading = false;
      const index = state.artists.findIndex((artist) => artist._id === action.payload._id);
      if (index >= 0) {
        state.artists[index] = action.payload;
      }
    },
    updateArtistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteArtistRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteArtistSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.artists = state.artists.filter((artist) => artist._id !== action.payload);
    },
    deleteArtistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setEditingArtist: (state, action: PayloadAction<IArtist | null>) => {
      state.editingArtist = action.payload;
      state.isEditing = !!action.payload;
    },
    clearEditingArtist: (state) => {
      state.editingArtist = null;
      state.isEditing = false;
    },
  },
});

export const {
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
  setEditingArtist,
  clearEditingArtist,
} = artistSlice.actions;

export default artistSlice.reducer;
