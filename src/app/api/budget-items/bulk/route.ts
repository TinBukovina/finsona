import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { budgetId, oldName, newName } = await request.json();

  if (!budgetId || !oldName || !newName) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabaseAdmin
      .from("budget_item")
      .update({ category: newName })
      .match({ budget_id: budgetId, category: oldName });

    if (error) throw error;

    return NextResponse.json({ message: "Category rename successfuly." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { budgetId, name } = await request.json();

  if (!budgetId || !name) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabaseAdmin.from("budget_item").delete().match({
      budget_id: budgetId,
      category: name,
    });

    if (error) throw error;

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
