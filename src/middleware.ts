import { auth } from './core/authentication'

import { type NextRequest, NextResponse } from 'next/server'

const isApiRoute = (req: NextRequest) => req.nextUrl.pathname.includes('/api')

const isPublicRoute = (req: NextRequest) => {
  return ['/login', '/signup', '/reset-credentials'].some((route) => req.nextUrl.pathname.includes(route))
}

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-next-pathname', request.nextUrl.pathname)

  if (isApiRoute(request)) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const session = await auth()

  // if (isPublicRoute(request) && session) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // if (!session && !isPublicRoute(request)) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|rpc)(.*)'],
}
