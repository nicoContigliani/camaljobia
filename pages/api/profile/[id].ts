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

// Función para extraer el token del header de autorización
function extractToken(req: NextApiRequest): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
}

// Función para obtener el userId del token
function getUserIdFromToken(token: string): string {
    const decoded = verifyToken(token);
    return decoded.userId;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
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

    // Verificar que el perfil pertenece al usuario autenticado
    const profile = await UserProfile.findById(id);
    if (!profile) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    if (profile.user.toString() !== userIdFromToken) {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
    }

    if (req.method === 'PUT') {
        try {
            // Evitar que el usuario cambie el propietario del perfil
            const { user, ...updateData } = req.body;
            
            const updatedProfile = await UserProfile.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true }
            );
            
            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ message: 'Error actualizando perfil' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await UserProfile.findByIdAndDelete(id);
            res.status(200).json({ message: 'Perfil eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error eliminando perfil' });
        }
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}