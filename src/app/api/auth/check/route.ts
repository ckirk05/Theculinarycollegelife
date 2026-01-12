import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()

    if (session && session.authenticated && session.expiresAt > Date.now()) {
      return NextResponse.json({
        authenticated: true,
      })
    }

    return NextResponse.json({
      authenticated: false,
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({
      authenticated: false,
    })
  }
}
