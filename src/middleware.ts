import { verifyJwt } from "6_shared/auth/auth";
import { routing } from "i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup"];

// Middleware for localization
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicRoutes.join("|")})/?$`,
    "i"
  );
  const isPublicRoute = publicPathnameRegex.test(request.nextUrl.pathname);

  // Turning on localization
  const response = intlMiddleware(request);

  // Checking if there is a session token, and if it is we decrypt it
  const token = request.cookies.get("session-token")?.value;
  const decodedToken = token ? await verifyJwt(token) : null;

  if (isPublicRoute) {
    // If user has a valid session token on a public route, redirect him to application
    if (decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Don't do anything if route if public
    return response;
  }

  // Checking if there is a session token
  if (!decodedToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("session-token");
    return response;
  }

  // If user is on protected route with valid token, do nothing
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
