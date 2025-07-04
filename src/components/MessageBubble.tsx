
import { ChatMessage } from '@/types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="flex max-w-[80%] items-start space-x-2">
        {!isUser && (
          <div className="w-8 h-8 bg-[#193a70] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">UNC</span>
          </div>
        )}
        
        <div
          className={`px-4 py-3 rounded-lg shadow-sm ${
            isUser
              ? 'bg-blue-100 text-gray-800 rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs text-gray-500 mt-2">
            {message.timestamp.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">Ud</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
