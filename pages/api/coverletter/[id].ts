import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import CoverLetter from '@/lib/models/CoverLetter';
import { JwtPayload, verifyToken } from '@/lib/utils/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

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
        const letter = await CoverLetter.findOne({ _id: id, user: userId });
        if (!letter) return res.status(404).json({ error: 'Letter not found' });
        res.status(200).json(letter);
        break;

      case 'PUT':
        const updatedLetter = await CoverLetter.findOneAndUpdate(
          { _id: id, user: userId },
          req.body,
          { new: true, runValidators: true }
        );
        if (!updatedLetter) return res.status(404).json({ error: 'Letter not found' });
        res.status(200).json(updatedLetter);
        break;

      case 'DELETE':
        const deletedLetter = await CoverLetter.findOneAndDelete({ _id: id, user: userId });
        if (!deletedLetter) return res.status(404).json({ error: 'Letter not found' });
        res.status(200).json({ message: 'Letter deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}