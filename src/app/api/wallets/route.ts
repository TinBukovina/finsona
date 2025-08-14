import { NextResponse } from "next/server";
import { getSession, supabaseAdmin } from "@/6_shared/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Catch all wallets from a user
    const { data: wallets, error } = await supabaseAdmin
      .from("wallets")
      .select("*")
      .eq("owner_id", session.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Success", wallets }, { status: 200 });
  } catch (error) {
    console.error("[WALLET_GET_ERROR]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
