export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
} 