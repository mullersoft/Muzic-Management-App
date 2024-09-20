// src/types.ts

export interface ISong {
  _id?: string;
  title: string;
  artists: string[];
  genres: string[];
  album?: string;
}

export interface Song {
  _id: string;
  title: string;
  artists: { _id: string; name: string }[];
  genres: { _id: string; name: string }[];
  album: { _id: string; name: string } | null;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArtist {
  _id?: string;
  name: string;
}

export interface Artist {
  _id: string;
  name: string;
}

export interface IGenre {
  _id?: string;
  name: string;
}

export interface Genre {
  _id: string;
  name: string;
}

export interface IAlbum {
  _id?: string;
  name: string;
  releaseDate?: string;
}

export interface Album {
  _id: string;
  name: string;
  songs: string[];
  artists: string[];
  createdAt: string;
  updatedAt: string;
}
