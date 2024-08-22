import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createGenreAsync } from '../../features/genres/genreSlice';
import { IGenre } from '../../types';

const GenreForm: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGenre: IGenre = { name };
    // dispatch(createGenreAsync(newGenre));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Genre Name"
        required
      />
      <button type="submit">Add Genre</button>
    </form>
  );
};

export default GenreForm;
