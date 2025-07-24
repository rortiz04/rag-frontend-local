
import { ChatMessage } from '@/types/chat';
import { useState } from 'react';

interface MessageBubbleProps {
  message: ChatMessage;
  onFeedback?: (id: string, value: 'like' | 'dislike', comment?: string) => void;
}

const MessageBubble = ({ message, onFeedback }: MessageBubbleProps) => {
  const isUser = message.role === 'user';
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState<'like' | 'dislike' | null>(null);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  const handleFeedback = (value: 'like' | 'dislike') => {
    setFeedbackValue(value);
    if (value === 'dislike') {
      setShowFeedback(true); // Mostrar textarea
      setSent(false); // Permitir reenviar si vuelve a tocar 👎
      setComment(''); // Limpiar comentario para nuevo feedback
    } else {
      setShowFeedback(false); // Ocultar textarea
      setComment(''); // Limpiar comentario
      sendFeedback(value, '');
    }
  };

  const sendFeedback = async (value: 'like' | 'dislike', customComment?: string) => {
    setSending(true);
    try {
      await fetch('http://127.0.0.1:8001/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respuesta_id: message.id,
          feedback: value,
          comentario: value === 'dislike' ? (customComment ?? comment) : undefined
        })
      });
      setSent(true);
      setShowFeedback(false); // Ocultar textarea y botón tras enviar
      if (onFeedback) onFeedback(message.id, value, customComment ?? comment);
    } catch (e) {
      // Manejo de error opcional
    } finally {
      setSending(false);
    }
  };

  // Si el usuario cambia de feedback después de enviar, volver a permitir enviar
  // y actualizar el feedback en el backend
  // (No bloqueamos los botones después de enviar)

  // Ocultar feedback en el mensaje de bienvenida (id === '1')
  const showFeedbackUI = !isUser && message.id !== '1';

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
          
          {/* Mostrar fuentes si existen */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-semibold mb-2">Fuentes:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {message.sources.map((source, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 font-semibold">{index + 1}.</span>
                    {source.url && source.url !== `URL no disponible para ${source.filename}` ? (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        title="Abrir documento PDF"
                      >
                        {source.filename}
                      </a>
                    ) : (
                      <span className="text-gray-600">{source.filename}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-2">
            {message.timestamp.toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          {/* Feedback UI solo para respuestas del asistente */}
          {showFeedbackUI && (
            <div className="flex flex-col items-start mt-2">
              <div className="flex gap-2">
                <button
                  className={`p-1 rounded-full border ${feedbackValue === 'like' ? 'bg-green-100 border-green-400' : 'border-gray-300'}`}
                  onClick={() => handleFeedback('like')}
                  disabled={sending}
                  aria-label="Me gusta"
                >
                  👍
                </button>
                <button
                  className={`p-1 rounded-full border ${feedbackValue === 'dislike' ? 'bg-red-100 border-red-400' : 'border-gray-300'}`}
                  onClick={() => handleFeedback('dislike')}
                  disabled={sending}
                  aria-label="No me gusta"
                >
                  👎
                </button>
              </div>
              {showFeedback && feedbackValue === 'dislike' && !sent && (
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <textarea
                    className="w-full border border-gray-300 rounded p-1 text-xs"
                    rows={2}
                    placeholder="¿Por qué no te gustó la respuesta? (opcional)"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    disabled={sending}
                  />
                  <button
                    className="self-end px-2 py-1 bg-blue-600 text-white rounded text-xs"
                    onClick={() => sendFeedback('dislike')}
                    disabled={sending}
                  >
                    Enviar feedback
                  </button>
                </div>
              )}
              {sent && (
                <div className="text-xs text-green-600 mt-2">¡Gracias por tu feedback!</div>
              )}
            </div>
          )}
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
