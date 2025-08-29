import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'API funciona correctamente',
      timestamp: new Date().toISOString(),
      status: 'OK'
    });
  }
  
  return res.status(405).json({ error: 'Método no permitido' });
}