import React, { useState, useEffect } from 'react';
import Table from './Table';
import { IArtist } from '../../types';
import { fetchArtists, createArtist, updateArtist, deleteArtist } from '../../api/artistApi';

const columns = ['name'];

const ArtistManagement: React.FC = () => {
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [editingArtist, setEditingArtist] = useState<IArtist | null>(null);
  const [newArtistName, setNewArtistName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch artists from the API
    const loadArtists = async () => {
      try {
        const data = await fetchArtists();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setArtists(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };
    loadArtists();
  }, []);

  const handleEdit = (item: { _id: string }) => {
    const artist = artists.find(artist => artist._id === item._id);
    if (artist) {
      setEditingArtist(artist);
      setNewArtistName(artist.name);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArtist(id);
      setArtists(artists.filter(artist => artist._id !== id));
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  const handleSave = async () => {
    const artistData = {
      name: newArtistName
    };

    if (isEditing && editingArtist) {
      try {
        if (!editingArtist._id) {
          throw new Error('Artist ID is undefined');
        }
        const updatedArtist = await updateArtist(editingArtist._id, artistData);
        setArtists(artists.map(artist => (artist._id === updatedArtist._id ? updatedArtist : artist)));
        setEditingArtist(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating artist:', error);
      }
    } else {
      try {
        const newArtist = await createArtist(artistData);
        setArtists([...artists, newArtist]);
        setNewArtistName('');
      } catch (error) {
        console.error('Error creating artist:', error);
      }
    }
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
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>

      <Table columns={columns} data={Array.isArray(artists) ? artists : []} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ArtistManagement;
