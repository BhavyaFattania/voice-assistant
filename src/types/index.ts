export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatState {
  messages: Message[];
  isRecording: boolean;
  isProcessing: boolean;
} 