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
        const [user, pwd] = decoded.split(':')

        const correctUser = process.env.DASHBOARD_USER || 'admin'
        // Default password if env variable is not set
        const correctPassword = process.env.DASHBOARD_PASSWORD || 'glorious2026'

        if (user === correctUser && pwd === correctPassword) {
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
