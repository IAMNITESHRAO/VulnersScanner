// middleware.ts or middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Apply protection to any route starting with /dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      // Force redirect to login page
      return NextResponse.redirect(new URL('/auth/auth1/login', request.url));
    }
  }

  return NextResponse.next();
}

// Define which routes this middleware applies to
export const config = {
  matcher: ['/dashboard/:path*'], // Protect /dashboard and all subroutes
};
