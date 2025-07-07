import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Running middleware...');

  const token = request.cookies.get('token')?.value;
  console.log('token' , token)
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/donate/:path*', '/profile/:path*'], // update for your protected routes
};


