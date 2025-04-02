import React, { useState, useRef, useEffect } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import { Message } from '../types';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #343541;
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #c5c5d2;
  text-align: center;
  padding: 1rem;
`;

const InputContainer = styled.div`
  padding: 1.5rem;
  background: #343541;
  border-top: 1px solid #4d4d4f;
  position: relative;
`;

const InputWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  background: #40414f;
  border: 1px solid #4d4d4f;
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  resize: none;
  min-height: 3rem;
  max-height: 200px;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const IconButton = styled(motion.button)`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  background: transparent;
  color: #c5c5d2;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    color: #666;
    cursor: not-allowed;
  }
`;

const BACKEND_URL = 'https://humble-space-rotary-phone-wr7wr5px5x9v259-3000.app.github.dev/'; // Replace with your actual forwarded URL

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import { Message } from '../types';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #343541;
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #c5c5d2;
  text-align: center;
  padding: 1rem;
`;

const InputContainer = styled.div`
  padding: 1.5rem;
  background: #343541;
  border-top: 1px solid #4d4d4f;
  position: relative;
`;

const InputWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  background: #40414f;
  border: 1px solid #4d4d4f;
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  resize: none;
  min-height: 3rem;
  max-height: 200px;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const IconButton = styled(motion.button)`
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  background: transparent;
  color: #c5c5d2;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    color: #666;
    cursor: not-allowed;
  }
`;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/test');
        const data = await response.json();
        console.log('Backend test:', data);
      } catch (error) {
        console.error('Backend test failed:', error);
      }
    };
    testBackend();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsProcessing(true);

    try {
      console.log('Sending request...');
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: currentInput
          }]
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        type: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your request.',
        type: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <ChatArea>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Start a conversation!</h2>
            <p>Type a message below to begin.</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={chatEndRef} />
      </ChatArea>
      <InputContainer>
        <InputWrapper>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <IconButton
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
          >
            <FaPaperPlane />
          </IconButton>
        </InputWrapper>
      </InputContainer>
    </Container>
  );
};

export default ChatContainer; 