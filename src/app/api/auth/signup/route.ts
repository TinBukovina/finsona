import supabaseAdmin from "6_shared/api/supabase_admin";
import { signJwt } from "6_shared/auth/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    // Chechin if user exist in database with that ID
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const password_hash = await bcrypt.hash(password, 12);

    // Creating and fetching user
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("users")
      .insert({ email, password_hash, is_verified: false })
      .select()
      .single();

    if (insertError || !newUser) {
      throw insertError || new Error("User could not be created.");
    }

    // Gnerating token for email verification
    const verificationToken = await signJwt(
      { id: newUser.id, email: newUser.email },
      { expiresIn: "1h" } // Token vrijedi 1 sat
    );

    // Generating verification link
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${verificationToken}`;

    // Send email with Resend
    const { error: resendError } = await resend.emails.send({
      from: "Finsona <onboarding@resend.dev>",
      to: email,
      subject: "Verify you email - Finsona",
      html: `<p>Please, click the following link to verify your email:</p><a href="${verificationUrl}">Potvrdi email</a>`,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json(
        { message: "Failed to send verification email." },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_RROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
