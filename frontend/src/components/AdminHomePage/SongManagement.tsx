import React, { useState, useEffect } from "react";
import Table from "./Table";
import { ISong, IAlbum, IArtist, IGenre } from "../../types";
import {
  fetchSongsApi,
  createSongApi,
  updateSongApi,
  deleteSongApi,
} from "../../api/songApi";
import { fetchAlbums } from "../../api/albumApi";
import { fetchArtists } from "../../api/artistApi";
import { fetchGenres } from "../../api/genreApi";

const columns = ["title"];

const SongManagement: React.FC = () => {
  const [songs, setSongs] = useState<ISong[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [editingSong, setEditingSong] = useState<ISong | null>(null);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(
    undefined
  );
  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(
    undefined
  );
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch songs from the API
    const loadSongs = async () => {
      try {
        const data = await fetchSongsApi();
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    // Fetch albums, artists, and genres from the API
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

    loadSongs();
    loadOptions();
  }, []);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteSongApi(id);
      setSongs(songs.filter((song) => song._id !== id));
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleSave = async () => {
    const songData = {
      title: newSongTitle,
      album: selectedAlbum,
      artists: [selectedArtist].filter(Boolean),
      genres: [selectedGenre].filter(Boolean),
    };

    if (isEditing && editingSong) {
      try {
        if (!editingSong._id) {
          throw new Error("Song ID is undefined");
        }
        const updatedSong = await updateSongApi(editingSong._id, songData);
        setSongs(
          songs.map((song) =>
            song._id === updatedSong._id ? updatedSong : song
          )
        );
        setEditingSong(null);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating song:", error);
      }
    } else {
      try {
        const newSong = await createSongApi(songData);
        setSongs([...songs, newSong]);
        setNewSongTitle("");
        setSelectedAlbum(undefined);
        setSelectedArtist(undefined);
        setSelectedGenre(undefined);
      } catch (error) {
        console.error("Error creating song:", error);
      }
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
        columns={columns}
        data={Array.isArray(songs) ? songs : []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SongManagement;
