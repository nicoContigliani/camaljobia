import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/utils/dbConnect';
import User from '../../../lib/models/User';
import { generateToken } from '../../../lib/utils/jwt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}