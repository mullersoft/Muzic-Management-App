import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Artist {
  _id: string;
  name: string;
}

interface ArtistsState {
  artists: Artist[];
  artist: Artist | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  status: "idle",
};

export const fetchArtists = createAsyncThunk(
  "artists/fetchArtists",
  async () => {
    const response = await axios.get("/api/artists");
    return response.data;
  }
);

export const fetchArtistById = createAsyncThunk(
  "artists/fetchArtistById",
  async (id: string) => {
    const response = await axios.get(`/api/artists/${id}`);
    return response.data;
  }
);

export const createArtist = createAsyncThunk(
  "artists/createArtist",
  async (newArtist: Partial<Artist>) => {
    const response = await axios.post("/api/artists", newArtist);
    return response.data;
  }
);

export const updateArtist = createAsyncThunk(
  "artists/updateArtist",
  async (updatedArtist: Partial<Artist>) => {
    const { _id, ...rest } = updatedArtist;
    const response = await axios.put(`/api/artists/${_id}`, rest);
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk(
  "artists/deleteArtist",
  async (id: string) => {
    await axios.delete(`/api/artists/${id}`);
    return id;
  }
);

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchArtistById.fulfilled, (state, action) => {
        state.artist = action.payload;
        state.status = "succeeded";
      })
      .addCase(createArtist.fulfilled, (state, action) => {
        state.artists.push(action.payload);
      })
      .addCase(updateArtist.fulfilled, (state, action) => {
        const index = state.artists.findIndex(
          (artist) => artist._id === action.payload._id
        );
        if (index !== -1) {
          state.artists[index] = action.payload;
        }
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.artists = state.artists.filter(
          (artist) => artist._id !== action.payload
        );
      });
  },
});

export default artistSlice.reducer;
