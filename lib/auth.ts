import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyAuth() {
    try {
        const token = (await cookies()).get('auth-token')?.value;

        if (!token) {
            throw new Error('Non authentifié');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        return decoded;
    } catch (error) {
        throw new Error('Non authentifié');
    }
}