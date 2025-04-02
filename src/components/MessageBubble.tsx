import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { FaUser, FaRobot } from 'react-icons/fa';
import TypingIndicator from './TypingIndicator';

interface BubbleContainerProps {
  isUser: boolean;
}

const BubbleContainer = styled(motion.div)<BubbleContainerProps>`
  display: flex;
  padding: 1.5rem;
  background: ${props => props.isUser ? '#343541' : '#444654'};
`;

const ContentWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 0.25rem;
  background: #007AFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Content = styled.div`
  color: #c5c5d2;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageBubble: React.FC<{ message: Message; isTyping?: boolean }> = ({ message, isTyping }) => {
  return (
    <BubbleContainer
      isUser={message.type === 'user'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ContentWrapper>
        <Avatar>
          {message.type === 'user' ? <FaUser /> : <FaRobot />}
        </Avatar>
        <Content>
          {message.content}
          {isTyping && <TypingIndicator />}
        </Content>
      </ContentWrapper>
    </BubbleContainer>
  );
};

export default MessageBubble; 