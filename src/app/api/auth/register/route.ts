import supabaseAdmin from "6_shared/api/supabase_admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
      return new NextResponse("User already exists", { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const { error } = await supabaseAdmin
      .from("users")
      .insert({ email, password_hash });

    if (error) {
      throw error;
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
