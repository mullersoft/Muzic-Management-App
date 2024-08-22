import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { createArtistAsync } from '../../features/artists/artistSlice';
import { IArtist } from '../../types';

const ArtistForm: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArtist: IArtist = { name };
    // dispatch(createArtistAsync(newArtist));
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Artist Name"
        required
      />
      <button type="submit">Add Artist</button>
    </form>
  );
};

export default ArtistForm;
