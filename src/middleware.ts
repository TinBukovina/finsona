import { verifyJwt } from "6_shared/auth/auth";
import { routing } from "i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export default createMiddleware(routing);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("session-token")?.value;

  const isPublicRoute = publicRoutes.some((publicPath) =>
    path.includes(publicPath)
  );

  // Checking if there is a session token, and if it is we decrypt it
  const decodedToken = token ? verifyJwt(token) : null;

  if (isPublicRoute) {
    // If user has a valid session token on a public route, redirect him to application
    if (decodedToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Don't do anything if route if public
    return NextResponse.next();
  }

  // Checking if there is a session token
  if (!decodedToken) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("session-token");
    return response;
  }

  // If user is on protected route with valid token, do nothing
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
