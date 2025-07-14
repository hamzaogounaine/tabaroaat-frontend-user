import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
// Assuming 'routing' contains your locales and defaultLocale
import { routing } from "./i18n/routing"; // This import might need adjustment based on your actual i18n setup

// The secret key for verifying JWT tokens
const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

// Define paths that require authentication (e.g., '/dashboard')
const protectedPaths = ["/donate"]; // Added "/donate" as a protected path

/**
 * Helper function to redirect to the login page.
 * @param {Request} request - The incoming Next.js request.
 * @param {string} locale - The current locale.
 * @param {string} currentPath - The path the user was trying to access.
 * @returns {NextResponse} A redirect response to the login page.
 */
function redirectToLogin(request, locale, currentPath) {
  const loginUrl = new URL(`/${locale}/login`, request.nextUrl.origin);
  loginUrl.searchParams.set("redirectTo", currentPath); // Add original path as a query parameter
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Handle Locale Redirection
  // Extract the first segment of the path as the potential locale
  const locale = pathname.split("/")[1];
  const isLocaleValid = routing.locales.includes(locale);

  // If the path doesn't start with a valid locale, redirect to add the default/preferred locale
  if (!isLocaleValid) {
    const preferredLocale =
      request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
  }

  // 2. Check if the current path is a protected route
  // A path is protected if it starts with a locale followed by any path in `protectedPaths`
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );

  // If the path is not protected, allow the request to proceed immediately
  if (!isProtected) {
    return NextResponse.next();
  }

  // 3. Authenticate Protected Routes with JWT Token
  // Get the token from the request cookies
  const token = request.cookies.get("token")?.value;

  // If no token is found, redirect to the login page
  if (!token) {
    return redirectToLogin(request, locale, pathname);
  }

  try {
    // Verify the token using the secret key
    await jwtVerify(token, secret);
    // If verification is successful, allow the request to proceed
    return NextResponse.next();
  } catch (err) {
    // If token verification fails (e.g., invalid, expired)
    console.error("⛔ Invalid token:", err.message);
    // Redirect to the login page and clear the invalid token cookie
    const response = redirectToLogin(request, locale, pathname);
    response.cookies.delete("token");
    return response;
  }
}

// Define the matcher to specify which paths the middleware should run on
export const config = {
  matcher: [
    "/", // Match the root path
    // Match all paths except API routes, Next.js internal files, and static assets
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};