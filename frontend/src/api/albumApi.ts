// albumApi.ts

import axios from "axios";
import { Album } from "../types";

const API_URL = "https://muzic-management-app.onrender.com"; 

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await axios.get(API_URL);
  // Extract the array of albums from the response data
  return response.data.data.albums;
};

export const createAlbum = async (
  album: Omit<Album, "_id" | "createdAt" | "updatedAt">
): Promise<Album> => {
  const response = await axios.post(API_URL, album);
  return response.data;
};

export const updateAlbum = async (
  id: string,
  album: Partial<Omit<Album, "_id" | "createdAt" | "updatedAt">>
): Promise<Album> => {
  const response = await axios.put(`${API_URL}/${id}`, album);
  return response.data;
};

export const deleteAlbum = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
