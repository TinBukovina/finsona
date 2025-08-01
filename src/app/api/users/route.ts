import supabaseAdmin from "@/6_shared/api/supabase_admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json({ users });
  } catch (error) {
    let errorMessage = "There was an unknown error.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error feching users: ", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
