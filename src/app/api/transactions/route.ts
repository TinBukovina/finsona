import { NextResponse } from "next/server";

import { CreateTransactionInterface } from "@/5_entities";
import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: transactions, error } = await supabaseAdmin
      .from("transactions")
      .select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Success", transactions },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { wallet_id, budget_item_id, type, amount, description } =
      await request.json();

    const { data: createdTransaction, error } = await supabaseAdmin
      .from("transactions")
      .insert({ wallet_id, budget_item_id, type, amount, description })
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json<CreateTransactionInterface>(
      { message: "succes", transaction: createdTransaction },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
