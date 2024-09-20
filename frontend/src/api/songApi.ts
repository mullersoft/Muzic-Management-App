// frontend\src\api\songApi.ts:
import axios from "axios";
import { ISong } from "../types";

const API_URL = "https://muzic-management-app.onrender.com/api/v1/songs";

// Fetch all songs
export const fetchSongsApi = async () => {
  const response = await axios.get(API_URL);
  return response.data.data.songs;
};

// Fetch a single song by ID
export const fetchSongApi = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new song
export const createSongApi = async (song: ISong) => {
  const response = await axios.post(API_URL, song);
  return response.data;
};

// Update song API call (expecting song ID and song data without _id)
export const updateSongApi = async (id: string, updatedSong: Omit<ISong, '_id'>): Promise<ISong> => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedSong);
  return response.data;
};

// Delete a song by ID
export const deleteSongApi = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
