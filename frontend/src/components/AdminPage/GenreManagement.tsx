import React, { useState, useEffect } from 'react';
import Table from './Table';
import { IGenre } from '../../types';
import { fetchGenres, createGenre, updateGenre, deleteGenre } from '../../api/genreApi';

const columns = ['name'];

const GenreManagement: React.FC = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [editingGenre, setEditingGenre] = useState<IGenre | null>(null);
  const [newGenreName, setNewGenreName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch genres from the API
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setGenres(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    loadGenres();
  }, []);

  const handleEdit = (item: { _id: string }) => {
    const genre = genres.find(genre => genre._id === item._id);
    if (genre) {
      setEditingGenre(genre);
      setNewGenreName(genre.name);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGenre(id);
      setGenres(genres.filter(genre => genre._id !== id));
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  const handleSave = async () => {
    const genreData = {
      name: newGenreName
    };

    if (isEditing && editingGenre) {
      try {
        if (!editingGenre._id) {
          throw new Error('Genre ID is undefined');
        }
        const updatedGenre = await updateGenre(editingGenre._id, genreData);
        setGenres(genres.map(genre => (genre._id === updatedGenre._id ? updatedGenre : genre)));
        setEditingGenre(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating genre:', error);
      }
    } else {
      try {
        const newGenre = await createGenre(genreData);
        setGenres([...genres, newGenre]);
        setNewGenreName('');
      } catch (error) {
        console.error('Error creating genre:', error);
      }
    }
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
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>

      <Table columns={columns} data={Array.isArray(genres) ? genres : []} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default GenreManagement;
