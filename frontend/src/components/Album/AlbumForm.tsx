import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createAlbumAsync } from '../../features/albums/albumSlice';
import { IAlbum } from '../../types';

const AlbumForm: React.FC = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const newAlbum: IAlbum = { name, artist, genre };
    // dispatch(createAlbumAsync(newAlbum));
    setName('');
    setArtist([]);
    setGenre([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Album Name"
        required
      />
      <input
        type="text"
        value={artist.join(', ')}
        onChange={(e) => setArtist(e.target.value.split(','))}
        placeholder="Artist(s)"
        required
      />
      <input
        type="text"
        value={genre.join(', ')}
        onChange={(e) => setGenre(e.target.value.split(','))}
        placeholder="Genre(s)"
        required
      />
      <button type="submit">Add Album</button>
    </form>
  );
};

export default AlbumForm;
