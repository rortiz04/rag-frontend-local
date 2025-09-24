import { ChatResponse } from '@/types/chat';

// Guardar el sessionId en localStorage para mantener la sesión
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const chatApi = async (message: string): Promise<ChatResponse> => {
  try {
    const payload = {
      sessionId: getSessionId(),
      action: "sendMessage",
      chatInput: message,
    };

    const response = await fetch('https://n8n.psi.unc.edu.ar/webhook/2b9e97d2-1e0d-4f05-89d3-d3b3446dcd31/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Ajustar a tu interfaz ChatResponseeee
    return { 
      answer: data.answer || data.output || "Sin respuesta",
      sources: data.sources || []
    };
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw new Error('Error al conectar con el servidor. Por favor, verifique que el backend esté ejecutándose.');
  }
};
