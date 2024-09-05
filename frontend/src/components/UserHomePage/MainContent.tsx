import React from 'react';
import styled from '@emotion/styled';
import { Song } from '../../types';

const MainContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SongCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SongTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const SongInfo = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 10px;
`;

interface MainContentProps {
  songs: Song[];
}

const MainContent: React.FC<MainContentProps> = ({ songs }) => {
  return (
    <MainContentContainer>
      {songs.length > 0 ? (
        <div>
          {songs.map((song) => (
            <SongCard key={song._id}>
              <SongTitle>{song.title}</SongTitle>
              <SongInfo>Artists: {song.artists.map((artist: any) => artist.name).join(', ')}</SongInfo>
              <SongInfo>Genres: {song.genres.map((genre: any) => genre.name).join(', ')}</SongInfo>
              <SongInfo>Album: {song.album ? song.album.name : 'N/A'}</SongInfo>
              <AudioPlayer controls>
                <source src={`/${song.fileUrl}`} type="audio/mp3" />
                Your browser does not support the audio element.
              </AudioPlayer>
            </SongCard>
          ))}
        </div>
      ) : (
        <p>No songs found.</p>
      )}
    </MainContentContainer>
  );
};

export default MainContent;
