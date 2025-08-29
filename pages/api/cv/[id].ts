import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import Curriculum, { ICurriculum } from '@/lib/models/Curriculum';
import { JwtPayload, verifyToken } from '@/lib/utils/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  // Get user ID from JWT
  let userId: string;
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = verifyToken(token);
    userId = decoded.userId;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get specific CV (verify ownership)
        const cv = await Curriculum.findOne({ _id: id, user: userId });
        if (!cv) {
          return res.status(404).json({ error: 'CV not found' });
        }
        res.status(200).json(cv);
        break;

      case 'PUT':
        // Update CV (verify ownership)
        const updatedCV = await Curriculum.findOneAndUpdate(
          { _id: id, user: userId },
          req.body,
          { new: true, runValidators: true }
        );
        if (!updatedCV) {
          return res.status(404).json({ error: 'CV not found' });
        }
        res.status(200).json(updatedCV);
        break;

      case 'DELETE':
        // Delete CV (verify ownership)
        const deletedCV = await Curriculum.findOneAndDelete({ _id: id, user: userId });
        if (!deletedCV) {
          return res.status(404).json({ error: 'CV not found' });
        }
        res.status(200).json({ message: 'CV deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}