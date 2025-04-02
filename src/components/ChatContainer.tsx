import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa';
import MessageBubble from './MessageBubble';
import { Message } from '../types';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import TypingIndicator from './TypingIndicator';

const Container = styled.div`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  padding: 1rem 2rem;
  background: #007AFF;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: #f8f9fa;
  scroll-behavior: smooth;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e0e0e0;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
  }
`;

const IconButton = styled(motion.button)`
  background: #007AFF;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:disabled {
    background: #ccc;
  }
`;

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);
  const { isListening, startListening, setIsListening } = useSpeechRecognition();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        type: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!isListening) {
      setIsListening(true);
      const text = await startListening();
      setInput(text);
    } else {
      setIsListening(false);
    }
  };

  return (
    <Container>
      <Header>AI Assistant</Header>
      <ChatArea>
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isProcessing && <TypingIndicator />}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </ChatArea>
      <InputContainer>
        <IconButton
          whileTap={{ scale: 0.95 }}
          onClick={handleVoiceInput}
          style={{ background: isListening ? '#ff4444' : '#007AFF' }}
        >
          {isListening ? <FaStop /> : <FaMicrophone />}
        </IconButton>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim() || isProcessing}
        >
          <FaPaperPlane />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatContainer; 