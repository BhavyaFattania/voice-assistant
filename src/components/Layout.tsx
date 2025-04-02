import React from 'react';
import styled from '@emotion/styled';
import { FaSearch, FaBars, FaCog } from 'react-icons/fa';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #343541;
  color: white;
`;

const Sidebar = styled.div`
  width: 260px;
  background-color: #202123;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #4d4d4f;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 1px solid #4d4d4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewChatButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background-color: transparent;
  border: 1px solid #4d4d4f;
  color: white;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d2d2e;
  }
`;

const SidebarItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d2d2e;
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('Layout component rendering'); // Debug log
  return (
    <LayoutContainer>
      <Sidebar>
        <NewChatButton>+ New chat</NewChatButton>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <SidebarItem>Previous chat 1</SidebarItem>
          <SidebarItem>Previous chat 2</SidebarItem>
          {/* Add more previous chats */}
        </div>
      </Sidebar>
      <MainContent>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FaBars style={{ cursor: 'pointer' }} />
            <span>AI Assistant</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FaSearch style={{ cursor: 'pointer' }} />
            <FaCog style={{ cursor: 'pointer' }} />
          </div>
        </Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 