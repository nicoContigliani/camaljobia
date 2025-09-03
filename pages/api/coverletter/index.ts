import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import CoverLetter from '@/lib/models/CoverLetter';
import { JwtPayload, verifyToken } from '@/lib/utils/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Get user ID from JWT
  let userId: string;
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = verifyToken(token) as JwtPayload;
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const { template } = req.query;
        let query: any = { user: userId };
        
        if (template === 'true') {
          query.isTemplate = true;
        }
        
        const letters = await CoverLetter.find(query).sort({ updatedAt: -1 });
        res.status(200).json(letters);
        break;

      case 'POST':
        const letterData = {
          ...req.body,
          user: userId,
        };
        
        const newLetter = await CoverLetter.create(letterData);
        res.status(201).json(newLetter);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}