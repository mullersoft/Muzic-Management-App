import React from 'react';
import styled from '@emotion/styled';

const SidebarContainer = styled.div`
  width: 300px;
  padding: 20px;
  border-right: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const SearchInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const FilterCheckbox = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-left: 8px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const NoDataMessage = styled.p`
  color: #888;
  font-size: 16px;
`;

interface SidebarProps {
  search: string;
  selectedFilters: { [key: string]: boolean };
  selectedGenres: string[];
  selectedArtists: string[];
  selectedAlbums: string[];
  genres: any[];
  artists: any[];
  albums: any[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filter: string) => void;
  onGenreChange: (genre: string) => void;
  onArtistChange: (artist: string) => void;
  onAlbumChange: (album: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  search,
  selectedFilters,
  selectedGenres,
  selectedArtists,
  selectedAlbums,
  genres,
  artists,
  albums,
  onSearchChange,
  onFilterChange,
  onGenreChange,
  onArtistChange,
  onAlbumChange,
  onSearch,
  onClear,
  loading,
  error
}) => {
  return (
    <SidebarContainer>
      <SearchInput
        type="text"
        value={search}
        onChange={onSearchChange}
        placeholder="Search by title"
      />
      <FilterCheckbox>
        <label>
          <input
            type="checkbox"
            checked={!!selectedFilters.artist}
            onChange={() => onFilterChange('artist')}
          />
          <FilterLabel>Artist</FilterLabel>
        </label>
      </FilterCheckbox>
      {selectedFilters.artist && (
        <div>
          <h4>Select Artists</h4>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <FilterCheckbox key={artist._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedArtists.includes(artist._id)}
                    onChange={() => onArtistChange(artist._id)}
                  />
                  {artist.name}
                </label>
              </FilterCheckbox>
            ))
          ) : (
            <NoDataMessage>No artists available.</NoDataMessage>
          )}
        </div>
      )}
      <FilterCheckbox>
        <label>
          <input
            type="checkbox"
            checked={!!selectedFilters.album}
            onChange={() => onFilterChange('album')}
          />
          <FilterLabel>Album</FilterLabel>
        </label>
      </FilterCheckbox>
      {selectedFilters.album && (
        <div>
          <h4>Select Albums</h4>
          {albums.length > 0 ? (
            albums.map((album) => (
              <FilterCheckbox key={album._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedAlbums.includes(album._id)}
                    onChange={() => onAlbumChange(album._id)}
                  />
                  {album.name}
                </label>
              </FilterCheckbox>
            ))
          ) : (
            <NoDataMessage>No albums available.</NoDataMessage>
          )}
        </div>
      )}
      <FilterCheckbox>
        <label>
          <input
            type="checkbox"
            checked={!!selectedFilters.genre}
            onChange={() => onFilterChange('genre')}
          />
          <FilterLabel>Genre</FilterLabel>
        </label>
      </FilterCheckbox>
      {selectedFilters.genre && (
        <div>
          <h4>Select Genres</h4>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <FilterCheckbox key={genre._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre._id)}
                    onChange={() => onGenreChange(genre._id)}
                  />
                  {genre.name}
                </label>
              </FilterCheckbox>
            ))
          ) : (
            <NoDataMessage>No genres available.</NoDataMessage>
          )}
        </div>
      )}
      <SearchButton onClick={onSearch}>Search</SearchButton>
      <ClearButton onClick={onClear}>Clear</ClearButton>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </SidebarContainer>
  );
};

export default Sidebar;
