import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { budget_id, name, planned_amount, category } = await request.json();

    if (!budget_id || !name || category === undefined) {
      return NextResponse.json(
        { message: "Didn't provide all required fields." },
        { status: 400 }
      );
    }

    const { data: newBudgetItem, error: insertError } = await supabaseAdmin
      .from("budget_item")
      .insert({
        budget_id,
        name,
        planned_amount: planned_amount || 0,
        category,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json(newBudgetItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
