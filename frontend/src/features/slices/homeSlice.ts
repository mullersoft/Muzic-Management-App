// songSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISong } from "../../types";

// Define the async thunk
export const fetchSongsAsync = createAsyncThunk(
  "songs/fetchSongs",
  async () => {
    const response = await axios.get("/api/v1/songs");
    return response.data; // Assuming response.data is the array of songs
  }
);

const songSlice = createSlice({
  name: "songs",
  initialState: {
    items: [] as ISong[],
    status: "idle",
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSongsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch songs";
      });
  },
});

export default songSlice.reducer;
