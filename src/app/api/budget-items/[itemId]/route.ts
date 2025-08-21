import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { itemId } = await params;
    const { name, planned_amount, category } = await request.json();

    if (!name && planned_amount === undefined && category === undefined) {
      return NextResponse.json(
        { message: "Either name or planned_amount must be provided." },
        { status: 400 }
      );
    }

    const dataToUpdate: {
      name?: string;
      planned_amount?: number;
      category?: string;
    } = {};
    if (name) {
      dataToUpdate.name = name;
    }

    if (planned_amount) {
      dataToUpdate.planned_amount = planned_amount;
    }

    if (category) {
      dataToUpdate.category = category;
    }

    const { data, error } = await supabaseAdmin
      .from("budget_item")
      .update(dataToUpdate)
      .eq("id", itemId);

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { itemId } = await params;

    const { error } = await supabaseAdmin
      .from("budget_item")
      .delete()
      .eq("id", itemId);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Budget item deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BUDGET_ITEM_DELETE_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
