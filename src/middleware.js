import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

// Create a secret key from your env
const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Locale detection
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
  const isLocale = routing.locales.includes(locale);
  const localeFromPath = isLocale ? locale : routing.defaultLocale;

  // Handle locale redirection
  if (!isLocale) {
    const intlMiddleware = createMiddleware(routing);
    return intlMiddleware(request);
  }

  // Check if the route is protected
  const protectedPaths = ["/donate", "/profile"];
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );

  if (!isProtected) return NextResponse.next();

  // JWT check using jose (Edge-compatible)
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("⛔ No token found.");

    // Save original path in query param
    const loginUrl = new URL(`/${locale}/login`, origin);
    loginUrl.searchParams.set("redirectTo", pathname); // ← this is key

    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, secret); // Will throw if invalid/expired
    console.log("✅ Token is valid.");
    return NextResponse.next();
  } catch (err) {
    console.error("⛔ Invalid token:", err.message);
    
    const loginUrl = new URL(`/${locale}/login`, origin);
    loginUrl.searchParams.set("redirectTo", pathname); // also redirect from expired token

    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};
