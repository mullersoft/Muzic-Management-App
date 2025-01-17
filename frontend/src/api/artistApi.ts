import axios from "axios";
import { IArtist } from "../types";

// const API_URL = "https://muzic-management-app.onrender.com"; 
// const API_URL = "http://localhost:7000"; 
// const API_URL = "/api/v1/artists"; 
const API_URL = "https://muzic-management-app.onrender.com/api/v1/artists";


// Fetch all artists
export const fetchArtists = async (): Promise<IArtist[]> => {
  const response = await axios.get(API_URL);
  return response.data.data.artists; 
};

// Create a new artist
export const createArtist = async (
  artist: Omit<IArtist, "_id">
): Promise<IArtist> => {
  const response = await axios.post(API_URL, artist);
  return response.data;
};

// Update an artist
export const updateArtist = async (
  id: string,
  artist: Partial<Omit<IArtist, "_id">>
): Promise<IArtist> => {
  const response = await axios.patch(`${API_URL}/${id}`, artist);
  return response.data;
};

// Delete an artist
export const deleteArtist = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
