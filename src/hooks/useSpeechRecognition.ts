import { useState, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/start-voice');
      const data = await response.json();
      setTranscript(data.text);
      return data.text;
    } catch (error) {
      console.error('Error:', error);
      return '';
    } finally {
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    setIsListening
  };
}; 