import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
`;

const Dot = styled(motion.div)`
  width: 4px;
  height: 4px;
  background: #c5c5d2;
  border-radius: 50%;
`;

const TypingIndicator: React.FC = () => {
  return (
    <Container>
      {[0, 1, 2].map((i) => (
        <Dot
          key={i}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </Container>
  );
};

export default TypingIndicator; 