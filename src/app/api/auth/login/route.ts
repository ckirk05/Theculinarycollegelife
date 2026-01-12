import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession, getSessionCookieOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password)

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }

    // Create session token
    const token = await createSession()

    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    })

    response.cookies.set('session', token, getSessionCookieOptions())

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
