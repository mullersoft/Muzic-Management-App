export interface Song {
  _id: string;
  title: string;
  artists: string[];
  genres: string[];
  album: string;
}

export interface Genre {
  _id: string;
  name: string;
}

export interface Artist {
  _id: string;
  name: string;
}

export interface Album {
  _id: string;
  name: string;
}
