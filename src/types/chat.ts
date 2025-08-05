
export interface SourceLink {
  filename: string;
  url: string | null;
  item_title?: string | null;
  collection?: string | null;
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
