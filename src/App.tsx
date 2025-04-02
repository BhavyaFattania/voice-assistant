import React from 'react';
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
    background: #f0f2f5;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <ChatContainer />
    </>
  );
}

export default App; 