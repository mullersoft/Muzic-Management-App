import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Album {
  _id: string;
  title: string;
  artist: string;
}

interface AlbumsState {
  albums: Album[];
  album: Album | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AlbumsState = {
  albums: [],
  album: null,
  status: "idle",
};

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  const response = await axios.get("/api/albums");
  return response.data;
});

export const fetchAlbumById = createAsyncThunk(
  "albums/fetchAlbumById",
  async (id: string) => {
    const response = await axios.get(`/api/albums/${id}`);
    return response.data;
  }
);

export const createAlbum = createAsyncThunk(
  "albums/createAlbum",
  async (newAlbum: Partial<Album>) => {
    const response = await axios.post("/api/albums", newAlbum);
    return response.data;
  }
);

export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  async (updatedAlbum: Partial<Album>) => {
    const { _id, ...rest } = updatedAlbum;
    const response = await axios.put(`/api/albums/${_id}`, rest);
    return response.data;
  }
);

export const deleteAlbum = createAsyncThunk(
  "albums/deleteAlbum",
  async (id: string) => {
    await axios.delete(`/api/albums/${id}`);
    return id;
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAlbumById.fulfilled, (state, action) => {
        state.album = action.payload;
        state.status = "succeeded";
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums.push(action.payload);
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.albums.findIndex(
          (album) => album._id === action.payload._id
        );
        if (index !== -1) {
          state.albums[index] = action.payload;
        }
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album._id !== action.payload
        );
      });
  },
});

export default albumSlice.reducer;
