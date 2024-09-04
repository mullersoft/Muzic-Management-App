// src/api/songApi.ts

import axios from "axios";
const API_URL = "https://muzic-management-app.onrender.com"; 

// Existing API functions
export const fetchSongsApi = async () => {
  const response = await axios.get(API_URL);
  return response.data.data.songs; 
};

export const fetchSongApi = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createSongApi = async (song: any) => {
  const response = await axios.post(API_URL, song);
  return response.data;
};

export const updateSongApi = async (id: string, updatedSong: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedSong);
  return response.data;
};

// Add the missing deleteSongApi function
export const deleteSongApi = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
