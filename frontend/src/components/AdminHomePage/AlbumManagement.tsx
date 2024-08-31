import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Album } from '../../types';
import { fetchAlbums, createAlbum, updateAlbum, deleteAlbum } from '../../api/albumApi';

const columns = ['name'];

const AlbumManagement: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch albums from the API
    const loadAlbums = async () => {
      try {
        const data = await fetchAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    loadAlbums();
  }, []);

  const handleEdit = (item: { _id: string }) => {
    const album = albums.find(album => album._id === item._id);
    if (album) {
      setEditingAlbum(album);
      setNewAlbumName(album.name);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAlbum(id);
      setAlbums(albums.filter(album => album._id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const handleSave = async () => {
    const albumData = {
      name: newAlbumName,
      songs: [], // Provide empty array or default value
      artists: [] // Provide empty array or default value
    };

    if (isEditing && editingAlbum) {
      try {
        const updatedAlbum = await updateAlbum(editingAlbum._id, albumData);
        setAlbums(albums.map(album => (album._id === updatedAlbum._id ? updatedAlbum : album)));
        setEditingAlbum(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating album:', error);
      }
    } else {
      try {
        const newAlbum = await createAlbum(albumData);
        setAlbums([...albums, newAlbum]);
        setNewAlbumName('');
      } catch (error) {
        console.error('Error creating album:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Albums</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>{isEditing ? 'Edit Album' : 'Create New Album'}</h3>
        <input
          type="text"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          placeholder="Album Name"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSave}>
          {isEditing ? 'Save Changes' : 'Create Album'}
        </button>
        {isEditing && (
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </div>

      <Table columns={columns} data={albums} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AlbumManagement;
