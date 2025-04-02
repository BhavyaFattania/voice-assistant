import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #007AFF;
  border-radius: 50%;
`;

const TypingIndicator: React.FC = () => {
  return (
    <Container>
      {[0, 1, 2].map((i) => (
        <Dot
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.2,
          }}
        />
      ))}
    </Container>
  );
};

export default TypingIndicator; 