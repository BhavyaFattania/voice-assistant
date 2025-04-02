import React from 'react';
import Layout from './components/Layout';
import ChatContainer from './components/ChatContainer';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #343541;
    color: white;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }
`;

function App() {
  console.log('App component rendering'); // Debug log
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <ChatContainer />
      </Layout>
    </>
  );
}

export default App; 