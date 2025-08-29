import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import Curriculum, { ICurriculum } from '@/lib/models/Curriculum';
import { JwtPayload, verifyToken } from '@/lib/utils/jwt';
import { Types } from 'mongoose'; // Importar Types de mongoose

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Get user ID from JWT
  let userId: string;
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = verifyToken(token) as JwtPayload;
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    if (req.method === 'POST') {
      const { profile, professional_summary, skills, work_experience } = req.body;

      // Validar datos requeridos
      if (!profile || !professional_summary) {
        return res.status(400).json({ 
          error: 'Datos incompletos. Se requieren profile y professional_summary' 
        });
      }

      // Crear el CV con datos validados
      const cvData: Partial<ICurriculum> = {
        profile,
        professional_summary,
        skills: skills || {},
        work_experience: work_experience || [],
        user: new Types.ObjectId(userId), // Convertir string a ObjectId
      };
      
      const newCV = await Curriculum.create(cvData);
      res.status(201).json(newCV);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Error importing CV:', error);
    res.status(500).json({ 
      error: error.message || 'Error interno del servidor al importar CV' 
    });
  }
}