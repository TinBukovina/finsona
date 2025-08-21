import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { budgetId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { budgetId } = await params;

    const { data: budgetItems, error } = await supabaseAdmin
      .from("budget_item")
      .select("*")
      .eq("budget_id", budgetId);

    if (error) {
      throw error;
    }

    return NextResponse.json(budgetItems, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
