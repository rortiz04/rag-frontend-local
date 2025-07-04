
import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import Loader from './Loader';
import { ChatMessage } from '@/types/chat';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatWindow = ({ messages, isLoading }: ChatWindowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
            <Loader />
            <span className="text-sm text-gray-600">Consultando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
