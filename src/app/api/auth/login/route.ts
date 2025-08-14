import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { signJwt, supabaseAdmin } from "@/6_shared/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

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

    if (user.disabled_at) {
      return NextResponse.json(
        {
          message: "The account is disabled.",
        },
        { status: 403 }
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
      maxAge: 60 * 60 * 24, // 24h
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
