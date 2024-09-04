import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import debounce from 'lodash/debounce';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { Song } from '../../types';

// Define the base URL for the API
const API_URL = "https://muzic-management-app.onrender.com"; 

const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
`;

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: boolean }>({
    artist: false,
    album: false,
    genre: false
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedAlbums, setSelectedAlbums] = useState<string[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use the base URL for the API request
        const response = await axios.get(`${API_URL}/api/v1/songs`);
        const allSongs = response.data.data.songs;

        const allArtists = allSongs.flatMap((song: any) => song.artists);
        const allAlbums = allSongs.map((song: any) => song.album).filter(Boolean);
        const allGenres = allSongs.flatMap((song: any) => song.genres);

        const uniqueArtists = Array.from(new Set(allArtists.map((artist: any) => artist._id)))
          .map(id => allArtists.find((artist: any) => artist._id === id));
        const uniqueAlbums = Array.from(new Set(allAlbums.map((album: any) => album._id)))
          .map(id => allAlbums.find((album: any) => album._id === id));
        const uniqueGenres = Array.from(new Set(allGenres.map((genre: any) => genre._id)))
          .map(id => allGenres.find((genre: any) => genre._id === id));

        setArtists(uniqueArtists || []);
        setAlbums(uniqueAlbums || []);
        setGenres(uniqueGenres || []);
      } catch (err: any) {
        setError(`Failed to fetch initial data. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      setError(null);

      try {
        if (query || selectedArtists.length || selectedGenres.length || selectedAlbums.length) {
          const filters: Record<string, string> = {
            title: query,
            artist: selectedArtists.join(','),
            genre: selectedGenres.join(','),
            album: selectedAlbums.join(','),
          };

          // Use the base URL for the API request
          const response = await axios.get(`${API_URL}/api/v1/songs`, { params: filters });
          setSongs(response.data.data?.songs || []);
        } else {
          setSongs([]);
        }
      } catch (err: any) {
        setError(`Failed to fetch songs. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }, 300),
    [selectedArtists, selectedGenres, selectedAlbums]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre) ? prevGenres.filter((g) => g !== genre) : [...prevGenres, genre]
    );
  };

  const handleArtistChange = (artist: string) => {
    setSelectedArtists((prevArtists) =>
      prevArtists.includes(artist) ? prevArtists.filter((a) => a !== artist) : [...prevArtists, artist]
    );
  };

  const handleAlbumChange = (album: string) => {
    setSelectedAlbums((prevAlbums) =>
      prevAlbums.includes(album) ? prevAlbums.filter((a) => a !== album) : [...prevAlbums, album]
    );
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      if (search || selectedArtists.length || selectedGenres.length || selectedAlbums.length) {
        const filters: Record<string, string> = {
          title: search,
          artist: selectedArtists.join(','),
          genre: selectedGenres.join(','),
          album: selectedAlbums.join(','),
        };

        // Use the base URL for the API request
        const response = await axios.get(`${API_URL}/api/v1/songs`, { params: filters });
        setSongs(response.data.data?.songs || []);
      } else {
        setSongs([]);
      }
    } catch (err: any) {
      setError(`Failed to fetch songs. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearch('');
    setSelectedFilters({ artist: false, album: false, genre: false });
    setSelectedGenres([]);
    setSelectedArtists([]);
    setSelectedAlbums([]);
    setSongs([]);
  };

  return (
    <Container>
      <Sidebar
        search={search}
        selectedFilters={selectedFilters}
        selectedGenres={selectedGenres}
        selectedArtists={selectedArtists}
        selectedAlbums={selectedAlbums}
        genres={genres}
        artists={artists}
        albums={albums}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onGenreChange={handleGenreChange}
        onArtistChange={handleArtistChange}
        onAlbumChange={handleAlbumChange}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
        error={error}
      />
      <MainContent songs={songs} />
    </Container>
  );
};

export default Home;
