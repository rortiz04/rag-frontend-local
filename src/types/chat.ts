
export interface SourceLink {
  filename: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: SourceLink[];
}

export interface ChatResponse {
  answer: string;
  sources?: SourceLink[];
}
