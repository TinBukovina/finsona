import supabaseAdmin from "6_shared/api/supabase_admin";
import { verifyJwt } from "6_shared/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return new NextResponse("Token mission", { status: 400 });
    }

    const decoded = await verifyJwt(token);
    console.log(token);
    console.log(decoded);
    if (!decoded || !decoded.id) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({ is_verified: true })
      .eq("id", decoded.id);

    if (error) {
      throw error;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("verified", "true");
    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error("[VERIFY_EMAIL_ERROR]", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "verification-failed");
    return NextResponse.redirect(loginUrl);
  }
}
