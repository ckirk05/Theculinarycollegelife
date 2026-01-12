import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import bcrypt from 'bcrypt'

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production'
const SESSION_DURATION = 60 * 60 // 1 hour in seconds

interface SessionPayload {
  authenticated: boolean
  expiresAt: number
  [key: string]: unknown
}

// Encode the secret as Uint8Array for jose
function getSecretKey() {
  return new TextEncoder().encode(SESSION_SECRET)
}

/**
 * Verify the provided password against the stored hash or plain password
 */
export async function verifyPassword(password: string): Promise<boolean> {
  // Check if plain password is set (easier for deployment)
  const plainPassword = process.env.ADMIN_PASSWORD
  if (plainPassword) {
    return password === plainPassword
  }

  // Fallback to hash-based authentication
  const storedHash = process.env.ADMIN_PASSWORD_HASH
  if (!storedHash) {
    console.error('Neither ADMIN_PASSWORD nor ADMIN_PASSWORD_HASH found in environment variables')
    return false
  }

  try {
    return await bcrypt.compare(password, storedHash)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}

/**
 * Create a new session token
 */
export async function createSession(): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION * 1000

  const token = await new SignJWT({ authenticated: true, expiresAt } as SessionPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(getSecretKey())

  return token
}

/**
 * Verify and decode a session token
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const verified = await jwtVerify(token, getSecretKey())
    return verified.payload as SessionPayload
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

/**
 * Get session from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return null
  }

  return await verifySession(token)
}

/**
 * Check if user is authenticated from request
 */
export async function isAuthenticated(request?: NextRequest): Promise<boolean> {
  if (request) {
    // For middleware
    const token = request.cookies.get('session')?.value
    if (!token) return false
    const session = await verifySession(token)
    return session !== null && session.authenticated && session.expiresAt > Date.now()
  } else {
    // For server components
    const session = await getSession()
    return session !== null && session.authenticated && session.expiresAt > Date.now()
  }
}

/**
 * Cookie options for session management
 */
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_DURATION,
    path: '/',
  }
}

/**
 * Hash a password (utility for generating ADMIN_PASSWORD_HASH)
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}
