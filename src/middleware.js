import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

const protectedPaths = ["/donate", "/profile"];

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false, // disables auto-detecting browser locale
});

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // 1. Locale Handling
  const locale = pathname.split("/")[1];
  const isLocale = routing.locales.includes(locale);

  if (!isLocale) {
    const preferredLocale =
      request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;
  
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
  }
  // 2. Protected Routes (must be locale-prefixed paths)
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(`/${locale}${path}`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // 3. Token Check
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, origin);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, secret); // will throw if invalid
    return NextResponse.next();
  } catch (err) {
    console.error("⛔ Invalid token:", err.message);

    const loginUrl = new URL(`/${locale}/login`, origin);
    loginUrl.searchParams.set("redirectTo", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/", "/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
