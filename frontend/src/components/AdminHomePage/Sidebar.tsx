import React from 'react';
import styled from '@emotion/styled';
import SidebarLink from './SidebarLink';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

interface SidebarProps {
  setSelectedPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedPage }) => {
  return (
    <SidebarContainer>
      <SidebarLink label="Manage Songs" onClick={() => setSelectedPage('songs')} />
      <SidebarLink label="Manage Genres" onClick={() => setSelectedPage('genres')} />
      <SidebarLink label="Manage Artists" onClick={() => setSelectedPage('artists')} />
      <SidebarLink label="Manage Albums" onClick={() => setSelectedPage('albums')} />
    </SidebarContainer>
  );
};

export default Sidebar;
