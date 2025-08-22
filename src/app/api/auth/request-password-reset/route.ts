import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { Resend } from "resend";

import { PUBLIC_ROUTES_CONFIG } from "6_shared";
import { supabaseAdmin } from "@/6_shared/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    // 1. Checking if user exists
    const { data: user, error: selectUserError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user || selectUserError) {
      return NextResponse.json(
        {
          message:
            "If a user with this email exists, a reset link has been sent.",
        },
        { status: 404 }
      );
    }

    // 2. Generating password reset token
    const secret = new TextEncoder().encode(process.env.PASSWORD_RESET_SECRET!);
    const token = await new SignJWT({ id: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .setIssuedAt()
      .sign(secret);

    const resetUrl = `${process.env.NEXT_PUBLIC_API_URL}${PUBLIC_ROUTES_CONFIG.reset_password}?token=${token}`;

    // 3. Send the reset email
    await resend.emails.send({
      from: "Finsona <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password - Finsona",
      html: `<p>Click the link to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
    });

    return NextResponse.json({
      message: "If a users with this email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("[PASSWORD_RESET_REQUEST_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
