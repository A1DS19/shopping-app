import { NextRequest } from 'next/server'

const unAuthenticatedRoutes = ['/auth/login', '/auth/signup']

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('Authentication')?.value

  if (!auth && !unAuthenticatedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return Response.redirect(new URL('/auth/login', req.url))
  }

  if (auth && unAuthenticatedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return Response.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ]
}
