// // // import { NextApiRequest, NextApiResponse } from 'next';
// // // import jwt from 'jsonwebtoken';
// // // import dbConnect from '@/lib/utils/dbConnect';
// // // import UserProfile from '@/lib/models/UserProfile';

// // // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// // // export interface JwtPayload {
// // //     userId: string;
// // //     email: string;
// // // }

// // // export function verifyToken(token: string): JwtPayload {
// // //     return jwt.verify(token, JWT_SECRET) as JwtPayload;
// // // }

// // // // Función para extraer el token del header de autorización
// // // function extractToken(req: NextApiRequest): string | null {
// // //     const authHeader = req.headers.authorization;
// // //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
// // //         return null;
// // //     }
// // //     return authHeader.substring(7);
// // // }

// // // // Función para obtener el userId del token
// // // function getUserIdFromToken(token: string): string {
// // //     const decoded = verifyToken(token);
// // //     return decoded.userId;
// // // }

// // // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// // //     const { id } = req.query;
// // //     const token = extractToken(req);
    
// // //     if (!token) {
// // //         return res.status(401).json({ message: 'Token no proporcionado' });
// // //     }

// // //     let userIdFromToken: string;
// // //     try {
// // //         userIdFromToken = getUserIdFromToken(token);
// // //     } catch (error) {
// // //         return res.status(401).json({ message: 'Token inválido o expirado' });
// // //     }

// // //     await dbConnect();

// // //     // Verificar que el perfil pertenece al usuario autenticado
// // //     const profile = await UserProfile.findById(id);
// // //     if (!profile) {
// // //         return res.status(404).json({ message: 'Perfil no encontrado' });
// // //     }

// // //     if (profile.user.toString() !== userIdFromToken) {
// // //         return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
// // //     }

// // //     if (req.method === 'PUT') {
// // //         try {
// // //             // Evitar que el usuario cambie el propietario del perfil
// // //             const { user, ...updateData } = req.body;
            
// // //             const updatedProfile = await UserProfile.findByIdAndUpdate(
// // //                 id, 
// // //                 updateData, 
// // //                 { new: true, runValidators: true }
// // //             );
            
// // //             res.status(200).json(updatedProfile);
// // //         } catch (error) {
// // //             res.status(500).json({ message: 'Error actualizando perfil' });
// // //         }
// // //     } else if (req.method === 'DELETE') {
// // //         try {
// // //             await UserProfile.findByIdAndDelete(id);
// // //             res.status(200).json({ message: 'Perfil eliminado correctamente' });
// // //         } catch (error) {
// // //             res.status(500).json({ message: 'Error eliminando perfil' });
// // //         }
// // //     } else {
// // //         res.setHeader('Allow', ['PUT', 'DELETE']);
// // //         res.status(405).end(`Método ${req.method} no permitido`);
// // //     }
// // // }


// // import { NextApiRequest, NextApiResponse } from 'next';
// // import jwt from 'jsonwebtoken';
// // import dbConnect from '@/lib/utils/dbConnect';
// // import UserProfile from '@/lib/models/UserProfile';

// // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// // export interface JwtPayload {
// //     userId: string;
// //     email: string;
// // }

// // export function verifyToken(token: string): JwtPayload {
// //     return jwt.verify(token, JWT_SECRET) as JwtPayload;
// // }

// // // Función para extraer el token del header de autorización
// // function extractToken(req: NextApiRequest): string | null {
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //         return null;
// //     }
// //     return authHeader.substring(7);
// // }

// // // Función para obtener el userId del token
// // function getUserIdFromToken(token: string): string {
// //     const decoded = verifyToken(token);
// //     return decoded.userId;
// // }

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //     const { id } = req.query;
    
// //     // Verificar si hay un token de acceso de invitado
// //     const guestToken = req.query.token as string;
// //     let userIdFromToken: string | null = null;

// //     if (guestToken) {
// //         try {
// //             // Verificar el token de invitado
// //             const decoded = verifyToken(guestToken);
// //             userIdFromToken = decoded.userId;
// //         } catch (error) {
// //             return res.status(401).json({ message: 'Token de invitado inválido' });
// //         }
// //     } else {
// //         // Verificar token de autenticación normal
// //         const token = extractToken(req);
// //         if (!token) {
// //             return res.status(401).json({ message: 'Token no proporcionado' });
// //         }

// //         try {
// //             userIdFromToken = getUserIdFromToken(token);
// //         } catch (error) {
// //             return res.status(401).json({ message: 'Token inválido o expirado' });
// //         }
// //     }

// //     await dbConnect();

// //     // Verificar que el perfil pertenece al usuario autenticado o al token de invitado
// //     const profile = await UserProfile.findById(id);
// //     if (!profile) {
// //         return res.status(404).json({ message: 'Perfil no encontrado' });
// //     }

// //     if (profile.user.toString() !== userIdFromToken) {
// //         return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
// //     }

// //     if (req.method === 'GET') {
// //         // Permitir GET para invitados y usuarios autenticados
// //         res.status(200).json(profile);
// //     } else if (req.method === 'PUT') {
// //         // Solo usuarios autenticados pueden actualizar
// //         if (guestToken) {
// //             return res.status(403).json({ message: 'Los invitados no pueden actualizar perfiles' });
// //         }
        
// //         try {
// //             // Evitar que el usuario cambie el propietario del perfil
// //             const { user, ...updateData } = req.body;
            
// //             const updatedProfile = await UserProfile.findByIdAndUpdate(
// //                 id, 
// //                 updateData, 
// //                 { new: true, runValidators: true }
// //             );
            
// //             res.status(200).json(updatedProfile);
// //         } catch (error) {
// //             res.status(500).json({ message: 'Error actualizando perfil' });
// //         }
// //     } else if (req.method === 'DELETE') {
// //         // Solo usuarios autenticados pueden eliminar
// //         if (guestToken) {
// //             return res.status(403).json({ message: 'Los invitados no pueden eliminar perfiles' });
// //         }
        
// //         try {
// //             await UserProfile.findByIdAndDelete(id);
// //             res.status(200).json({ message: 'Perfil eliminado correctamente' });
// //         } catch (error) {
// //             res.status(500).json({ message: 'Error eliminando perfil' });
// //         }
// //     } else {
// //         res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
// //         res.status(405).end(`Método ${req.method} no permitido`);
// //     }
// // }



// import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';
// import dbConnect from '@/lib/utils/dbConnect';
// import UserProfile from '@/lib/models/UserProfile';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export interface JwtPayload {
//     userId: string;
//     email: string;
// }

// export function verifyToken(token: string): JwtPayload {
//     return jwt.verify(token, JWT_SECRET) as JwtPayload;
// }

// // Función para extraer el token del header de autorización
// function extractToken(req: NextApiRequest): string | null {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return null;
//     }
//     return authHeader.substring(7);
// }

// // Función para obtener el userId del token
// function getUserIdFromToken(token: string): string {
//     const decoded = verifyToken(token);
//     return decoded.userId;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.query;
    
//     // Verificar si hay un token de acceso de invitado
//     const guestToken = req.query.token as string;
//     let userIdFromToken: string | null = null;

//     if (guestToken) {
//         try {
//             // Verificar el token de invitado
//             const decoded = verifyToken(guestToken);
//             userIdFromToken = decoded.userId;
//         } catch (error) {
//             return res.status(401).json({ message: 'Token de invitado inválido' });
//         }
//     } else {
//         // Verificar token de autenticación normal
//         const token = extractToken(req);
//         if (!token) {
//             return res.status(401).json({ message: 'Token no proporcionado' });
//         }

//         try {
//             userIdFromToken = getUserIdFromToken(token);
//         } catch (error) {
//             return res.status(401).json({ message: 'Token inválido o expirado' });
//         }
//     }

//     await dbConnect();

//     if (req.method === 'GET') {
//         try {
//             // Buscar perfil por ID o por usuario
//             let profile;
//             if (id && id.length === 24) { // Si es un ObjectId válido (24 caracteres hex)
//                 profile = await UserProfile.findById(id);
//             } else {
//                 // Si no es un ObjectId, buscar por userId
//                 profile = await UserProfile.findOne({ user: id });
//             }
            
//             if (!profile) {
//                 return res.status(404).json({ message: 'Perfil no encontrado' });
//             }

//             // Verificar que el perfil pertenece al usuario autenticado o al token de invitado
//             if (profile.user.toString() !== userIdFromToken) {
//                 return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
//             }

//             res.status(200).json(profile);
//         } catch (error) {
//             res.status(500).json({ message: 'Error obteniendo perfil' });
//         }
//     } else if (req.method === 'PUT') {
//         // Solo usuarios autenticados pueden actualizar
//         if (guestToken) {
//             return res.status(403).json({ message: 'Los invitados no pueden actualizar perfiles' });
//         }
        
//         try {
//             // Buscar perfil por ID
//             const profile = await UserProfile.findById(id);
//             if (!profile) {
//                 return res.status(404).json({ message: 'Perfil no encontrado' });
//             }

//             // Verificar que el perfil pertenece al usuario autenticado
//             if (profile.user.toString() !== userIdFromToken) {
//                 return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
//             }

//             // Evitar que el usuario cambie el propietario del perfil
//             const { user, ...updateData } = req.body;
            
//             const updatedProfile = await UserProfile.findByIdAndUpdate(
//                 id, 
//                 updateData, 
//                 { new: true, runValidators: true }
//             );
            
//             res.status(200).json(updatedProfile);
//         } catch (error) {
//             res.status(500).json({ message: 'Error actualizando perfil' });
//         }
//     } else if (req.method === 'DELETE') {
//         // Solo usuarios autenticados pueden eliminar
//         if (guestToken) {
//             return res.status(403).json({ message: 'Los invitados no pueden eliminar perfiles' });
//         }
        
//         try {
//             // Buscar perfil por ID
//             const profile = await UserProfile.findById(id);
//             if (!profile) {
//                 return res.status(404).json({ message: 'Perfil no encontrado' });
//             }

//             // Verificar que el perfil pertenece al usuario autenticado
//             if (profile.user.toString() !== userIdFromToken) {
//                 return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
//             }

//             await UserProfile.findByIdAndDelete(id);
//             res.status(200).json({ message: 'Perfil eliminado correctamente' });
//         } catch (error) {
//             res.status(500).json({ message: 'Error eliminando perfil' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//         res.status(405).end(`Método ${req.method} no permitido`);
//     }
// }



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