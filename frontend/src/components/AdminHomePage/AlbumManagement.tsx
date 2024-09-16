// src/components/AdminHomePage/AlbumManagement.tsx
import React, { useState, useEffect } from 'react';
import Table from './Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsStart, createAlbumStart, updateAlbumStart, deleteAlbumStart } from '../../features/slices/albumSlice';
import { Album } from '../../types';
import { RootState } from '../../store';

const columns = ['name'];

const AlbumManagement: React.FC = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchAlbumsStart());
  }, [dispatch]);

  const handleEdit = (item: { _id: string }) => {
    const album = albums.find(album => album._id === item._id);
    if (album) {
      setEditingAlbum(album);
      setNewAlbumName(album.name);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAlbumStart(id));
  };

  const handleSave = () => {
    const albumData: Omit<Album, '_id' | 'createdAt' | 'updatedAt'> = {
      name: newAlbumName,
      songs: [],
      artists: [],
    };

    if (isEditing && editingAlbum) {
      dispatch(updateAlbumStart({ id: editingAlbum._id, data: albumData }));
      setIsEditing(false);
      setEditingAlbum(null);
    } else {
      dispatch(createAlbumStart(albumData));
    }

    setNewAlbumName('');
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
