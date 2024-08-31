import axios from "axios";
import { IGenre } from "../types";

const API_URL = "/api/v1/genres";

export const fetchGenres = async (): Promise<IGenre[]> => {
  const response = await axios.get(API_URL);
  console.log("Fetched genres:", response.data);
  return response.data.data.genres; 
};

export const createGenre = async (
  genre: Omit<IGenre, "_id">
): Promise<IGenre> => {
  const response = await axios.post(API_URL, genre);
  return response.data;
};

export const updateGenre = async (
  id: string,
  genre: Partial<Omit<IGenre, "_id">>
): Promise<IGenre> => {
  const response = await axios.put(`${API_URL}/${id}`, genre);
  return response.data;
};

export const deleteGenre = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
