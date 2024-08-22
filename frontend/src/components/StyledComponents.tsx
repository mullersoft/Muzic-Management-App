import styled from 'styled-components';

// Container for layout
export const Container = styled.div`
  display: flex;
`;

// Sidebar styling
export const Sidebar = styled.div`
  width: 25%;
  padding: 1rem;
  background-color: #f4f4f4;
`;

// Main content styling
export const MainContent = styled.div`
  width: 75%;
  padding: 1rem;
`;

// Search input
export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

// Filter checkbox
export const FilterCheckbox = styled.div`
  margin-bottom: 1rem;
`;

// Filter label
export const FilterLabel = styled.span`
  margin-left: 0.5rem;
`;

// Buttons
export const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
`;

export const ClearButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

// No data message
export const NoDataMessage = styled.p`
  color: #888;
`;

// Song card styling
export const SongCard = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

// Song title styling
export const SongTitle = styled.h3`
  margin: 0;
`;

// Song info styling
export const SongInfo = styled.p`
  margin: 0.5rem 0;
`;

// Audio player styling
export const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 1rem;
`;
