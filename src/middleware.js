import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET); // Or process.env.JWT_SECRET

const protectedPaths = ["/donate"];

function redirectToLogin(request, locale, currentPath) {
  const loginUrl = new URL(`/${locale}/login`, request.nextUrl.origin);
  loginUrl.searchParams.set("redirectTo", currentPath);
  console.log(`Redirecting to login from ${currentPath}`); // Added log
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(`Middleware running for: ${pathname}`); // Log start

  const locale = pathname.split("/")[1];
  const isLocaleValid = routing.locales.includes(locale);

  if (!isLocaleValid) {
    const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;
    console.log(`Redirecting to add locale: /${preferredLocale}${pathname}`); // Added log
    return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}`, request.url));
  }

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );

  if (!isProtected) {
    console.log(`${pathname} is not protected. Proceeding.`); // Added log
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log(`Protected path: ${pathname}. Token found: ${!!token}`); // Log token presence

  if (!token) {
    console.log("No token found. Redirecting to login."); // Added log
    return redirectToLogin(request, locale, pathname);
  }

  try {
    await jwtVerify(token, secret);
    console.log(`Token verified for ${pathname}. Proceeding.`); // Added log
    return NextResponse.next();
  } catch (err) {
    console.error("⛔ Invalid token during verification:", err.message); // More specific error log
    const response = redirectToLogin(request, locale, pathname);
    response.cookies.delete("token");
    console.log("Invalid token, redirecting and deleting cookie."); // Added log
    return response;
  }
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};