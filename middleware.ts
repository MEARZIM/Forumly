import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.redirect(new URL('/signIn', req.nextUrl))
  }
}


export const config = {
  matcher: ['/community/:path*/submit', '/community/create'],
}