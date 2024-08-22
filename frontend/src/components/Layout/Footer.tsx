import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  padding: ${(props) => props.theme.spacing(2)};
  text-align: center;
  position: relative; /* Changed from fixed to relative */
  width: 100%;
  margin-top: 20px; /* Adjust this value based on your layout */
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} Music Management App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
