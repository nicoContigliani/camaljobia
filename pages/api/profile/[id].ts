import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/utils/dbConnect';
import UserProfile from '@/lib/models/UserProfile';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
    userId: string;
    email: string;
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

function extractToken(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}

function getUserIdFromToken(token: string): string {
    const decoded = verifyToken(token);
    return decoded.userId;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    
    // Verificar token
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

    try {
        // Buscar perfil por ID de usuario (no por ID de perfil)
        const profile = await UserProfile.findOne({ user: id });
        
        if (!profile) {
            return res.status(404).json({ message: 'Perfil no encontrado' });
        }

        // Verificar que el perfil pertenece al usuario autenticado
        if (profile.user.toString() !== userIdFromToken) {
            return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
        }

        if (req.method === 'GET') {
            res.status(200).json(profile);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Método ${req.method} no permitido`);
        }
    } catch (error) {
        console.error('Error en API profile:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}