// src/api/songApi.ts

import axios from "axios";

// Existing API functions
export const fetchSongsApi = async () => {
  const response = await axios.get("/api/v1/songs"); // Adjust endpoint as necessary
  return response.data;
};

export const fetchSongApi = async (id: string) => {
  const response = await axios.get(`/api/v1/songs/${id}`); // Adjust endpoint as necessary
  return response.data;
};

export const createSongApi = async (song: any) => {
  const response = await axios.post("/api/v1/songs", song); // Adjust endpoint as necessary
  return response.data;
};

export const updateSongApi = async (id: string, updatedSong: any) => {
  const response = await axios.put(`/api/v1/songs/${id}`, updatedSong);
  return response.data;
};

// Add the missing deleteSongApi function
export const deleteSongApi = async (id: string) => {
  await axios.delete(`/api/v1/songs/${id}`);
};
