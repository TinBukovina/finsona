import { NextRequest, NextResponse } from "next/server";

import { supabaseAdmin, verifyJwt } from "@/6_shared/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return new NextResponse("Token mission", { status: 400 });
    }

    const decoded = await verifyJwt(token);

    if (!decoded || !decoded.id) {
      return new NextResponse("Invalid or expired token", { status: 400 });
    }

    // Checkig if user exists
    const { error } = await supabaseAdmin
      .from("users")
      .update({ is_verified: true })
      .eq("id", decoded.id);

    if (error) {
      throw error;
    }

    // Adding default settings to new created user
    const { error: settingsInsertError } = await supabaseAdmin
      .from("user_settings")
      .insert({
        id: decoded.id,
        default_currency: "EUR",
        month_start_day: 1,
        theme: "dark",
        language: "en",
      });

    if (settingsInsertError) {
      throw settingsInsertError;
    }

    const loginUrl = new URL("/auth/login", process.env.NEXT_PUBLIC_API_URL!);
    loginUrl.searchParams.set("verified", "true");
    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error("[VERIFY_EMAIL_ERROR]", error);
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("error", "verification-failed");
    return NextResponse.redirect(loginUrl);
  }
}
