import supabaseAdmin from "6_shared/api/supabase_admin";
import { signJwt } from "6_shared/auth/auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) {
      return NextResponse.json(
        {
          message: "Wrong credentials.",
        },
        {
          status: 401,
        }
      );
    }

    if (!user.is_verified) {
      return NextResponse.json(
        { message: "Please verify your email before logging in." },
        { status: 403 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Wrong credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await signJwt({ id: user.id, email: user.email });

    const response = NextResponse.json(
      { message: "login successful" },
      { status: 200 }
    );

    response.cookies.set("session-token", token, {
      httpOnly: true, // Spreijčava pristup kolačiću putem JavaScripta
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Pomaže u zaštiti od CSRF napada
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
