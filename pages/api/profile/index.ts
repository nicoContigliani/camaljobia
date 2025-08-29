import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/utils/dbConnect';
import UserProfile from '@/lib/models/UserProfile';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
    userId: string;
    email: string;
}

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

// Función para extraer el token del header de autorización
function extractToken(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7); // Elimina 'Bearer ' para obtener solo el token
}

// Función para obtener el userId del token
function getUserIdFromToken(token: string): string {
    const decoded = verifyToken(token);
    return decoded.userId;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verificar el token JWT
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    let userIdFromToken: string;
    try {
        userIdFromToken = getUserIdFromToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    await dbConnect();

    if (req.method === 'GET') {
        try {
            const profile = await UserProfile.findOne({ user: userIdFromToken });

            if (!profile) {
                return res.status(404).json({ message: 'Perfil no encontrado' });
            }

            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    } else if (req.method === 'POST') {
        try {
            const existingProfile = await UserProfile.findOne({ user: userIdFromToken });

            if (existingProfile) {
                return res.status(400).json({ message: 'El perfil ya existe' });
            }

            const profile = new UserProfile({
                ...req.body,
                user: userIdFromToken
            });

            await profile.save();
            res.status(201).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error creando perfil' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}