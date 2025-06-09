import { SignJWT, jwtDecrypt, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Convert secret to Uint8Array
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    return new TextEncoder().encode(secret)
}

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
}

export async function comparePasswords(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
}

export async function generateToken(user: User): Promise<string> {
    return await new SignJWT({
        id: user.id,
        name: user.name,
        email: user.email
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getJwtSecret())
}

export async function verifyToken(token: string): Promise<User | null> {
    try {
        const { payload } = await jwtVerify(token, getJwtSecret())
        return payload as User
    } catch (error) {
        console.log('Token verification failed:', error)
        return null
    }
}

export async function setAuthCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    })
}

export async function getAuthCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('authToken')?.value
}

export async function removeAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('authToken')
}