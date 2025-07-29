import supabaseAdmin from "6_shared/api/supabase_admin";
import { signJwt } from "6_shared/auth/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, passcode } = await request.json();
    console.log(email, passcode);

    if (!email || !passcode) {
      return NextResponse.json(
        { message: "Email and passcode are required" },
        { status: 400 }
      );
    }

    // 1. Finding latest valid passcode for email
    const { data: passcodeData, error: findError } = await supabaseAdmin
      .from("email_passcodes")
      .select("code_hash")
      .eq("email", email)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (findError || !passcodeData) {
      return NextResponse.json(
        { message: "Invalid passcode." },
        { status: 400 }
      );
    }

    // 2. Compare the submitted passcode with hashed code
    const isValidPasscode = await bcrypt.compare(
      passcode,
      passcodeData.code_hash
    );

    if (!isValidPasscode) {
      return NextResponse.json(
        { message: "Invalid passcode." },
        { status: 401 }
      );
    }

    // 3. Find user to kreate session token
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json(
        { message: "No user with that email." },
        { status: 404 }
      );
    }

    // 4. Creating session token
    const token = await signJwt({ id: user.id, email: user.email });

    const response = NextResponse.json({ message: "Loggin successful" });
    response.cookies.set("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[VERIFY_PASSCODE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
