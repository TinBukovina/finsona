import { TransactionInterface } from "@/5_entities";
import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { budgetItemId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { budgetItemId } = await params;

    const { data: transactions, error } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("budget_item_id", budgetItemId);

    if (error) {
      throw error;
    }

    return NextResponse.json<TransactionInterface[]>(transactions, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
