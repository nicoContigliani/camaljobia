import { useState, useCallback } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  success: boolean;
  response: string;
  model?: string;
  error?: string;
  details?: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      setMessages(prev => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: data.response }
      ]);

    } catch (error) {
      console.error('Error en useChat:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);
  const clearMessages = useCallback(() => setMessages([]), []);

  return { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearError, 
    clearMessages 
  };
};