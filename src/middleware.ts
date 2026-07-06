import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Secure all dashboard pages and tour/task management APIs
  if (
    url.pathname.startsWith('/dashboard') || 
    url.pathname.startsWith('/api/tours') || 
    url.pathname.startsWith('/api/tasks')
  ) {
    const authHeader = request.headers.get('authorization')

    if (authHeader) {
      try {
        const auth = authHeader.split(' ')[1]
        // Use web-native atob for edge runtime compatibility
        const decoded = atob(auth)
        const parts = decoded.split(':')
        // Get everything after the first ':' as the password
        const pwd = parts.slice(1).join(':')

        const rawPassword = process.env.DASHBOARD_PASSWORD || 'AAAaaa111'
        const correctPassword = rawPassword.replace(/^['"]|['"]$/g, '')

        if (pwd === correctPassword) {
          return NextResponse.next()
        }
      } catch (e) {
        console.error('Basic Auth decoding failed:', e)
      }
    }

    // Prompt user for credentials
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Glorious Travel Admin"',
      },
    })
  }

  return NextResponse.next()
}

// Matching paths
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/api/tours/:path*', 
    '/api/tasks/:path*'
  ],
}
