// src/components/Song/SongForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSongThunk } from '../../store/slices/songSlice';
import { AppDispatch } from '../../store/store'; // Import AppDispatch type
import { Song } from '../../types/song';

const SongForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Ensure dispatch is typed with AppDispatch
  const navigate = useNavigate();
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: '',
    artist: '',
    genre: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({ ...prevSong, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(createSongThunk(newSong)); // Dispatch the thunk
    navigate('/songs'); // Navigate to the song list or another page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={newSong.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="artist"
        value={newSong.artist}
        onChange={handleChange}
        placeholder="Artist"
      />
      <input
        type="text"
        name="genre"
        value={newSong.genre}
        onChange={handleChange}
        placeholder="Genre"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SongForm;
