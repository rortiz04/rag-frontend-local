
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: {
    value: 'like' | 'dislike';
    comment?: string;
    sent?: boolean;
  };
}

export interface ChatResponse {
  answer: string;
}
