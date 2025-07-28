import { cookies } from "next/headers";
import { signJwt, UserJwtPayload, verifyJwt } from "./auth";
import { NextRequest, NextResponse } from "next/server";

// Function for getting current session token info
export async function getSession(): Promise<UserJwtPayload | null> {
  const token = (await cookies()).get("session-token")?.value;
  const decoded = token ? verifyJwt(token) : null;

  if (!decoded) {
    return null;
  }

  return decoded;
}

// Function for updating session token
export function updateSession(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("session-token")?.value;
  const decoded = token ? verifyJwt(token) : null;

  // Cheching if token is there and if it is valid
  if (!decoded) return response;

  // Cretring new token with the same data, but with new expiring date
  const newToken = signJwt(decoded);

  // Setting up new sessoin token in cookies with new expiring date
  response.cookies.set("session-token", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  });

  return response;
}
