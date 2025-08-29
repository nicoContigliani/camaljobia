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

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = generateToken({ userId: user._id.toString(), email: user.email });

    res.status(201).json({
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