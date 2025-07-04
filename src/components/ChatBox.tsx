
import { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatBox = ({ onSendMessage, disabled = false }: ChatBoxProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
      <div className="flex space-x-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escriba su consulta sobre normativas..."
          className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#193a70] focus:border-transparent"
          rows={2}
          disabled={disabled}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="bg-[#193a70] hover:bg-[#2a4a82] text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <Send size={16} />
          <span>Enviar</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
