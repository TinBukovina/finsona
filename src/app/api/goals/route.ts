import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: goals, error } = await supabaseAdmin
      .from("goals")
      .select("*")
      .eq("owner_id", session.id);

    if (error) {
      throw error;
    }

    return NextResponse.json(goals);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, target_amount, target_date } = await request.json();

    const { data: newGoal, error } = await supabaseAdmin
      .from("goals")
      .insert({
        name,
        target_amount,
        target_date,
        owner_id: session.id,
        current_amount: 0,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(newGoal);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
