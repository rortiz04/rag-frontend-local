
import { useState } from 'react';
import ChatWindow from '@/components/ChatWindow';
import ChatBox from '@/components/ChatBox';
import { ChatMessage } from '@/types/chat';
import { chatApi } from '@/api/chat';

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Bienvenido al asistente del Digesto UNC! Puede realizar consultas sobre normativas, resoluciones y documentos institucionales de la Universidad Nacional de Córdoba.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await chatApi(content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        sources: data.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar su consulta. Por favor, intente nuevamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (id: string, value: 'like' | 'dislike', comment?: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, feedback: { value, comment, sent: true } } : msg
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#193a70] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">UNC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">DIGESTO UNC</h1>
                <p className="text-sm opacity-90">Universidad Nacional de Córdoba</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm hover:text-gray-200 cursor-pointer">Inicio</span>
              <span className="text-sm hover:text-gray-200 cursor-pointer">Login</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-120px)]">
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Asistente de Consultas - Digesto UNC
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Realice búsquedas y acceda a las normativas de la institución
            </p>
          </div>
          
          <ChatWindow messages={messages} isLoading={isLoading} onFeedback={handleFeedback} />
          <ChatBox onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
