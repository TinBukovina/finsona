import supabaseAdmin from "6_shared/api/supabase_admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("pocketa");
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Generating random passcode
    const passcode = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hashing passcode
    const code_hash = await bcrypt.hash(passcode, 12);

    // 3. Creating expiering time
    const expires_at = new Date(Date.now() + 10 * 60 * 1000); // 10min for expiering time

    // 4. Inserting passcode into database
    const { error: insertError } = await supabaseAdmin
      .from("email_passcodes")
      .insert({ email, code_hash, expires_at });

    if (insertError) {
      console.log(insertError);
      return NextResponse.json(
        { messag: "Internal server error" },
        { status: 500 }
      );
    }

    // 5. Sending passcode via email
    const { error: resendError } = await resend.emails.send({
      from: "Finsona <onboarding@resend.dev>",
      to: email,
      subject: "Your Finsona Login Code",
      html: `<p>Your one-time passcode is: <strong>${passcode}</strong></p><p>It will expire in 10 minutes.</p>`,
    });

    if (resendError) console.log(resendError);

    return NextResponse.json(
      { message: "Passcode sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
