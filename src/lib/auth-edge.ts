/**
 * Edge-compatible authentication functions for middleware
 * This file only uses edge-compatible libraries (no bcrypt)
 */

import { jwtVerify } from 'jose'
import { NextRequest } from 'next/server'

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production'

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
 * Verify and decode a session token (Edge-compatible)
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
 * Check if user is authenticated from request (Edge-compatible)
 */
export async function isAuthenticatedEdge(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get('session')?.value
    if (!token) return false

    const session = await verifySession(token)
    return session !== null && session.authenticated && session.expiresAt > Date.now()
  } catch (error) {
    console.error('Authentication check error:', error)
    return false
  }
}
