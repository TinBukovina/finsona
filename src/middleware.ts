import { PRIVATE_ROUTES_CONFIG, PUBLIC_ROUTES_CONFIG } from "6_shared";
import { verifyJwt } from "6_shared/auth/auth";
import { routing } from "i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "./6_shared/api";

const publicRoutes = [
  PUBLIC_ROUTES_CONFIG.login,
  PUBLIC_ROUTES_CONFIG.signup,
  PUBLIC_ROUTES_CONFIG.email_login,
  PUBLIC_ROUTES_CONFIG.forgot_password,
  PUBLIC_ROUTES_CONFIG.reset_password,
];

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
      const { data: user } = await supabaseAdmin
        .from("users")
        .select("disabled_at")
        .eq("id", decodedToken.id)
        .single();

      if (!user?.disabled_at) {
        return NextResponse.redirect(
          new URL(PRIVATE_ROUTES_CONFIG.budget, request.url)
        );
      }
    }

    // Don't do anything if route if public
    return response;
  }

  // Checking if there is a session token
  if (!decodedToken) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("session-token");
    return response;
  }

  // If user is on protected route with disabled account, move him to login
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("disabled_at")
    .eq("id", decodedToken.id)
    .single();

  if (user?.disabled_at) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("session-token");
    return response;
  }

  // If user is on protected route with valid token, do nothing
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
