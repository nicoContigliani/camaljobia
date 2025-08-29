import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import Curriculum, { ICurriculum } from '@/lib/models/Curriculum';
import { JwtPayload, verifyToken } from '@/lib/utils/jwt';

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
    switch (req.method) {
      case 'GET':
        // Get all CVs for the authenticated user
        const cvs = await Curriculum.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(cvs);
        break;

      case 'POST':
        // Create a new CV
        const cvData: Partial<ICurriculum> = {
          ...req.body,
          user: userId,
        };
        
        const newCV = await Curriculum.create(cvData);
        res.status(201).json(newCV);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}