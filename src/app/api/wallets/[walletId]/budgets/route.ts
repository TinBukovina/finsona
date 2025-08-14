import { GetBudgetsResponse } from "@/5_entities";
import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { walletId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { walletId } = params;

    // First check if user is owner of targeted wallet
    const { data: walletOwner, error: ownerError } = await supabaseAdmin
      .from("wallets")
      .select("id")
      .eq("id", walletId)
      .eq("owner_id", session.id)
      .single();

    if (ownerError || !walletOwner) {
      return NextResponse.json(
        { message: "Forbidden or Not Found!" },
        { status: 403 }
      );
    }

    // Fetch all budgets for that wallet
    const { data: budgets, error: budgetsError } = await supabaseAdmin
      .from("budgets")
      .select("*")
      .eq("wallet_id", walletId)
      .order("created_at", { ascending: false });

    if (budgetsError) throw budgetsError;

    return NextResponse.json<GetBudgetsResponse>(
      { message: "Success", budgets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return new Response("Internal server error.", { status: 500 });
  }
}
