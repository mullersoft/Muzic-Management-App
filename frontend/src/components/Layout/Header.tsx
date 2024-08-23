import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: ${(props) => props.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.nav`
  a {
    color: white;
    margin-left: ${(props) => props.theme.spacing(2)};
    text-decoration: none;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Music Management</h1>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="#">About</Link>
      



        {/* <Link to="/songs">Songs</Link>
        <Link to="/albums">Albums</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/genres">Genres</Link> */}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
