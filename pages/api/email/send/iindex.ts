import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, EmailData } from '@/lib/utils/nodemailer';
import { verifyToken } from '@/lib/utils/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificar autenticación
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    verifyToken(token);
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  try {
    const emailData: EmailData = req.body;
    
    // Validar campos obligatorios
    if (!emailData.to || !emailData.subject || !emailData.html) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Enviar email
    const success = await sendEmail(emailData);
    
    if (success) {
      res.status(200).json({ message: 'Email enviado correctamente' });
    } else {
      res.status(500).json({ error: 'Error al enviar el email' });
    }
  } catch (error: any) {
    console.error('Error in email API:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}