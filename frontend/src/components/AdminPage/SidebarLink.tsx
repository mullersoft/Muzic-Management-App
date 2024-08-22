import React from 'react';
import styled from '@emotion/styled';

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 16px;
  padding: 10px;
  text-align: left;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #34495e;
  }
`;

interface SidebarLinkProps {
  label: string;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ label, onClick }) => {
  return <LinkButton onClick={onClick}>{label}</LinkButton>;
};

export default SidebarLink;
