import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Message } from '../types';

const BubbleContainer = styled(motion.div)<{ isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin: 1rem 0;
`;

const Bubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 1rem;
  border-radius: 1rem;
  background: ${props => props.isUser ? '#007AFF' : 'white'};
  color: ${props => props.isUser ? 'white' : 'black'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <BubbleContainer
      isUser={message.type === 'user'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Bubble isUser={message.type === 'user'}>
        {message.content}
      </Bubble>
    </BubbleContainer>
  );
};

export default MessageBubble; 