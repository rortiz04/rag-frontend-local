
import { ChatResponse } from '@/types/chat';

// Simulación del endpoint de chat RAG
export const chatApi = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch('http://127.0.0.1:8001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { answer: data.answer };
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw new Error('Error al conectar con el servidor. Por favor, verifique que el backend esté ejecutándose.');
  }
};