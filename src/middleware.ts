import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Allow access to the login page
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.next()
  }

  // Allow access to auth API routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Check authentication for all other admin routes
  const authenticated = await isAuthenticated(request)

  if (!authenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/upload/:path*'],
}
