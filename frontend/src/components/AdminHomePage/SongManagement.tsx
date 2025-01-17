// frontend\src\components\AdminHomePage\SongManagement.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "./Table";
import { RootState, AppDispatch } from "../../store";
import { ISong, IAlbum, IArtist, IGenre } from "../../types";
import { fetchSongsRequest, deleteSong } from "../../features/slices/songSlice";
import { fetchAlbums } from "../../api/albumApi";
import { fetchArtists } from "../../api/artistApi";
import { fetchGenres } from "../../api/genreApi";
import axios from "axios";

const API_URL = "https://muzic-management-app.onrender.com";

const SongManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [editingSong, setEditingSong] = useState<ISong | null>(null);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest());

    const loadOptions = async () => {
      try {
        const [albumsData, artistsData, genresData] = await Promise.all([
          fetchAlbums(),
          fetchArtists(),
          fetchGenres(),
        ]);

        if (Array.isArray(albumsData)) setAlbums(albumsData);
        if (Array.isArray(artistsData)) setArtists(artistsData);
        if (Array.isArray(genresData)) setGenres(genresData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    loadOptions();
  }, [dispatch]);

  const handleEdit = (item: { _id: string }) => {
    const song = songs.find((song) => song._id === item._id);
    if (song) {
      setEditingSong(song);
      setNewSongTitle(song.title);
      setSelectedAlbum(song.album);
      setSelectedArtist(song.artists[0]);
      setSelectedGenre(song.genres[0]);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", newSongTitle);
    formData.append("album", selectedAlbum || "");
    formData.append("artists", selectedArtist || "");
    formData.append("genres", selectedGenre || "");
    
    if (file) {
      formData.append("fileUrl", file); // Change 'file' to 'fileUrl'
    }
  
    try {
      const url = isEditing && editingSong ? `${API_URL}/api/v1/songs/${editingSong._id}` : `${API_URL}/api/v1/songs`;
      const method = isEditing ? 'PATCH' : 'POST';
  
      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log(response.data);
      // Reset form data after saving
      setNewSongTitle("");
      setSelectedAlbum(undefined);
      setSelectedArtist(undefined);
      setSelectedGenre(undefined);
      setFile(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving song:", error);
      alert("An error occurred while saving the song. Please try again.");
    }
  };
  
  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Songs</h2>
      <div style={{ marginBottom: "20px" }}>
        <h3>{isEditing ? "Edit Song" : "Create New Song"}</h3>
        <input
          type="text"
          value={newSongTitle}
          onChange={(e) => setNewSongTitle(e.target.value)}
          placeholder="Song Title"
          style={{ marginRight: "10px" }}
        />
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Album</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>
              {album.name}
            </option>
          ))}
        </select>
        <select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Artist</option>
          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSave}>
          {isEditing ? "Save Changes" : "Create Song"}
        </button>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>
      <Table
        columns={["title"]}
        data={Array.isArray(songs) ? songs : []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SongManagement;
