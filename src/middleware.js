import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken 
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  console.log('Running middleware...');

  // Check if this is a protected route that needs authentication
  const protectedRoutes = ['/donate', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.includes(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value;
    console.log('token', token);

    if (!token) {
      console.log('No token found. Redirecting to login.');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET); 
      console.log('Token is valid and not expired.');
    } catch (error) {
      console.error('Token verification failed:', error.message);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token'); // Clear the expired/invalid token
      return response;
    }
  }

  // Apply internationalization middleware
  return intlMiddleware(request);
}

// Apply middleware only to protected routes
export const config = {
  matcher: ['/donate/:path*', '/profile/:path*' , "/(pt|en)/:path*"], // update for your protected routes
};