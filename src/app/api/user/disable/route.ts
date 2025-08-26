import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({ disabled_at: new Date().toISOString() })
      .eq("id", session.id);

    if (error) {
      console.error("Error disabling account: ", error);
      return NextResponse.json(
        { message: "Failed to disable account." },
        { status: 500 }
      );
    }

    (await cookies()).delete("session-token");

    return NextResponse.json(
      { message: "Account disabled successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DISABLE_ACCOUNT_ERROR]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
