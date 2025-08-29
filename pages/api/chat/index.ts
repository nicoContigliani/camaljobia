import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' });
    }

    console.log('Enviando a Ollama:', message);

    // Hacer la solicitud a Ollama
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3',
        prompt: message,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Error de Ollama: ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();
    
    return res.status(200).json({
      success: true,
      response: data.response,
      model: data.model
    });

  } catch (error) {
    console.error('Error en /api/chat:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}