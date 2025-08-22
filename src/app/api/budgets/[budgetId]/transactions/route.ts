import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { budgetId: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { budgetId } = await params;

  console.log(
    `[API TRANSACTIONS] GET handler pokrenut za budgetId: ${budgetId} u ${new Date().toLocaleTimeString()}`
  );

  if (!budgetId) {
    return NextResponse.json(
      { message: "Budget ID required." },
      { status: 400 }
    );
  }

  try {
    // Getting all budget items
    const { data: budgetItems, error: budgetItemError } = await supabaseAdmin
      .from("budget_item")
      .select("id")
      .eq("budget_id", budgetId);

    if (budgetItemError) {
      throw budgetItemError;
    }

    if (!budgetItems || budgetItems.length === 0) {
      return NextResponse.json([]);
    }

    const budgetItemIds = budgetItems.map((item) => item.id);

    // Getting all transactions
    const { data: transactions, error: transactionsError } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .in("budget_item_id", budgetItemIds);

    if (transactionsError) {
      throw transactionsError;
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}
