import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import Table from './Table';
import { IArtist } from '../../types';
import { 
  fetchArtistsRequest, 
  createArtistRequest, 
  updateArtistRequest, 
  deleteArtistRequest, 
  setEditingArtist, 
  clearEditingArtist 
} from '../../features/slices/artistSlice';

const columns = ['name'];

const ArtistManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { artists, editingArtist, isEditing } = useSelector((state: RootState) => state.artists);
  const [newArtistName, setNewArtistName] = useState('');

  useEffect(() => {
    dispatch(fetchArtistsRequest());
  }, [dispatch]);

  const handleEdit = (item: { _id: string }) => {
    const artist = artists.find(artist => artist._id === item._id);
    if (artist) {
      dispatch(setEditingArtist(artist));
      setNewArtistName(artist.name);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteArtistRequest(id));
  };

  const handleSave = () => {
    if (isEditing && editingArtist) {
      dispatch(updateArtistRequest({ _id: editingArtist._id!, name: newArtistName }));
    } else {
      dispatch(createArtistRequest({ name: newArtistName }));
    }
    setNewArtistName('');
    dispatch(clearEditingArtist());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Artists</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>{isEditing ? 'Edit Artist' : 'Create New Artist'}</h3>
        <input
          type="text"
          value={newArtistName}
          onChange={(e) => setNewArtistName(e.target.value)}
          placeholder="Artist Name"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSave}>
          {isEditing ? 'Save Changes' : 'Create Artist'}
        </button>
        {isEditing && (
          <button onClick={() => dispatch(clearEditingArtist())} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>
      <Table data={artists} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ArtistManagement;
