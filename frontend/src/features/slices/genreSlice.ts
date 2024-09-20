import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGenre } from '../../types';

interface GenreState {
  genres: IGenre[];
  loading: boolean;
  error: string | null;
  editingGenre: IGenre | null;
  isEditing: boolean;
}

const initialState: GenreState = {
  genres: [],
  loading: false,
  error: null,
  editingGenre: null,
  isEditing: false,
};

const genreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    fetchGenresRequest: (state) => {
      state.loading = true;
    },
    fetchGenresSuccess: (state, action: PayloadAction<IGenre[]>) => {
      state.loading = false;
      state.genres = action.payload;
    },
    fetchGenresFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createGenreRequest: (state, action: PayloadAction<{ name: string }>) => {
      state.loading = true;
    },
    createGenreSuccess: (state, action: PayloadAction<IGenre>) => {
      state.loading = false;
      state.genres.push(action.payload);
    },
    createGenreFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateGenreRequest: (state, action: PayloadAction<{ _id: string; name: string }>) => {
      state.loading = true;
    },
    updateGenreSuccess: (state, action: PayloadAction<IGenre>) => {
      state.loading = false;
      const index = state.genres.findIndex((genre) => genre._id === action.payload._id);
      if (index >= 0) {
        state.genres[index] = action.payload;
      }
    },
    updateGenreFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteGenreRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteGenreSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.genres = state.genres.filter((genre) => genre._id !== action.payload);
    },
    deleteGenreFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setEditingGenre: (state, action: PayloadAction<IGenre | null>) => {
      state.editingGenre = action.payload;
      state.isEditing = !!action.payload;
    },
    clearEditingGenre: (state) => {
      state.editingGenre = null;
      state.isEditing = false;
    },
  },
});

export const {
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
  setEditingGenre,
  clearEditingGenre,
} = genreSlice.actions;

export default genreSlice.reducer;
