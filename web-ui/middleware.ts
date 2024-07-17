import { NextRequest } from 'next/server'

import authenticated from './actions/auth/authenticated'
import { unAuthenticatedRoutes } from './constants/routes'

export function middleware(req: NextRequest) {
  const auth = authenticated()

  if (!auth && !unAuthenticatedRoutes.some((route) => req.nextUrl.pathname.startsWith(route.path))) {
    return Response.redirect(new URL('/auth/login', req.url))
  }

  if (auth && unAuthenticatedRoutes.some((route) => req.nextUrl.pathname.startsWith(route.path))) {
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
