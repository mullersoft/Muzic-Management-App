// src/features/songs/songSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { fetchSongsApi, fetchSongApi } from "../../api/songApi";
import { Song } from "../../types/song";

interface SongsState {
  songs: Song[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentSong: Song | null; // Add this line
}

const initialState: SongsState = {
  songs: [],
  status: "idle",
  error: null,
  currentSong: null, // Initialize this
};

// Thunks
export const fetchSongsThunk = createAsyncThunk(
  "songs/fetchSongs",
  async () => {
    const response = await fetchSongsApi();
    return response;
  }
);

export const fetchSongByIdThunk = createAsyncThunk(
  "songs/fetchSongById",
  async (id: string) => {
    const response = await fetchSongApi(id);
    return response;
  }
);

// Slice
const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
      })
      .addCase(fetchSongsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchSongByIdThunk.fulfilled, (state, action) => {
        state.currentSong = action.payload;
      });
  },
});

export const selectSongs = (state: RootState) => state.songs.songs;
export const selectSongStatus = (state: RootState) => state.songs.status;
export const selectSongError = (state: RootState) => state.songs.error;
export const selectCurrentSong = (state: RootState) => state.songs.currentSong; // Export the selector

export default songSlice.reducer;
