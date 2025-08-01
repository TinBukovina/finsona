import supabaseAdmin from "6_shared/api/supabase_admin";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({
        message: "Token and new password are required.",
      });
    }

    // 1. Veraying password reset token
    const secret = new TextEncoder().encode(process.env.PASSWORD_RESET_SECRET!);
    const { payload: user } = await jwtVerify(token, secret);

    if (!user.id) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }

    // 2. Hashing new password
    const password_hash = await bcrypt.hash(password, 12);

    // 3. Update usersr password
    const { error } = await supabaseAdmin
      .from("users")
      .update({ password_hash })
      .eq("id", user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("[PASSWORD_RESET_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
