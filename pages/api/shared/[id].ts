// pages/api/shared/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/dbConnect';
import Curriculum from '@/lib/models/Curriculum';
import UserProfile from '@/lib/models/UserProfile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cv = await Curriculum.findById(id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const profile = await UserProfile.findOne({ user: cv.user });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Solo datos públicos básicos
    const publicData = {
      cv: {
        _id: cv._id,
        profile: cv.profile,
        professional_summary: cv.professional_summary,
        skills: cv.skills,
        work_experience: cv.work_experience,
        education: cv.education,
        courses: cv.courses
      },
      profile: {
        fullname: profile.fullname,
        email: profile.email,
        phone: profile.phone,
        linkedin: profile.linkedin,
        portfolio: profile.portfolio
      }
    };

    res.status(200).json(publicData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}