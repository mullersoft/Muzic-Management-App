import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import Table from './Table';
import { IGenre } from '../../types';
import { 
  fetchGenresRequest, 
  createGenreRequest, 
  updateGenreRequest, 
  deleteGenreRequest, 
  setEditingGenre, 
  clearEditingGenre 
} from '../../features/slices/genreSlice';

const columns = ['name'];

const GenreManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { genres, editingGenre, isEditing } = useSelector((state: RootState) => state.genres);
  const [newGenreName, setNewGenreName] = useState('');

  useEffect(() => {
    dispatch(fetchGenresRequest());
  }, [dispatch]);

  const handleEdit = (item: { _id: string }) => {
    const genre = genres.find(genre => genre._id === item._id);
    if (genre) {
      dispatch(setEditingGenre(genre));
      setNewGenreName(genre.name);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteGenreRequest(id));
  };

  const handleSave = () => {
    const genreData = {
      name: newGenreName
    };

    if (isEditing && editingGenre) {
      dispatch(updateGenreRequest({ _id: editingGenre._id!, name: newGenreName }));
    } else {
      dispatch(createGenreRequest(genreData));
    }
    setNewGenreName('');
    dispatch(clearEditingGenre());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Genres</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>{isEditing ? 'Edit Genre' : 'Create New Genre'}</h3>
        <input
          type="text"
          value={newGenreName}
          onChange={(e) => setNewGenreName(e.target.value)}
          placeholder="Genre Name"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSave}>
          {isEditing ? 'Save Changes' : 'Create Genre'}
        </button>
        {isEditing && (
          <button onClick={() => dispatch(clearEditingGenre())} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>
      <Table columns={columns} data={genres} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default GenreManagement;
