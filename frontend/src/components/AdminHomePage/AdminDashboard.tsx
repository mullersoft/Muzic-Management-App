// AdminDashboard.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';
import SongManagement from './SongManagement';
import GenreManagement from './GenreManagement';
import ArtistManagement from './ArtistManagement';
import AlbumManagement from './AlbumManagement';
import Report from './Report'; 

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

const AdminDashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<string>('report'); // Default to 'report'

  const renderContent = () => {
    switch (selectedPage) {
      case 'songs':
        return <SongManagement />;
      case 'genres':
        return <GenreManagement />;
      case 'artists':
        return <ArtistManagement />;
      case 'albums':
        return <AlbumManagement />;
      case 'report':
        return <Report />;
      default:
        return <Report />; 
    }
  };

  return (
    <DashboardContainer>
      <Sidebar setSelectedPage={setSelectedPage} />
      <ContentArea>
        {renderContent()}
      </ContentArea>
    </DashboardContainer>
  );
};

export default AdminDashboard;
