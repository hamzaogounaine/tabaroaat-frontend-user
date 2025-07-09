import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

export function middleware(request) {
  console.log('Running middleware...');

  const token = request.cookies.get('token')?.value;
  console.log('token', token);

  if (!token) {
    console.log('No token found. Redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET); 
    console.log('Token is valid and not expired.');
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token'); // Clear the expired/invalid token
    return response;
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/donate/:path*', '/profile/:path*'], // update for your protected routes
};