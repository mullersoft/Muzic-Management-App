// src/store/slices/genreSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateSongApi } from "../../api/songApi";

// Update the thunk to accept an object with `id` and `updatedSong`
export const updateSongThunk = createAsyncThunk(
  "songs/update",
  async ({ id, updatedSong }: { id: string; updatedSong: any }) => {
    const response = await updateSongApi(id, updatedSong);
    return response;
  }
);

const genreSlice = createSlice({
  name: "genres",
  initialState: {
    // Your initial state here
  },
  reducers: {
    // Your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSongThunk.fulfilled, (state, action) => {
        // Handle successful update
      })
      .addCase(updateSongThunk.rejected, (state, action) => {
        // Handle errors
      });
  },
});

export default genreSlice.reducer;
