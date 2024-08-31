// // src/store/slices/songSlice.ts
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { Song } from "../../types/song";

// const API_URL = "http://localhost:5000/songs"; // Adjust as needed

// interface SongsState {
//   songs: Song[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: SongsState = {
//   songs: [],
//   status: "idle",
//   error: null,
// };

// export const fetchSongsThunk = createAsyncThunk(
//   "songs/fetchSongs",
//   async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
//   }
// );

// export const createSongThunk = createAsyncThunk(
//   "songs/createSong",
//   async (song: Omit<Song, "id">) => {
//     const response = await axios.post(API_URL, song);
//     return response.data;
//   }
// );

// const songSlice = createSlice({
//   name: "songs",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSongsThunk.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchSongsThunk.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.songs = action.payload;
//       })
//       .addCase(fetchSongsThunk.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message || "Failed to fetch songs";
//       })
//       .addCase(createSongThunk.fulfilled, (state, action) => {
//         state.songs.push(action.payload);
//       });
//   },
// });

// export default songSlice.reducer;
