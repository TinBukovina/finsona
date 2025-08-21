import { getSession, supabaseAdmin } from "@/6_shared/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { budgetId: string } }
) {
  try {
    const session = await getSession();
    if (!session?.id) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { budgetId } = await params;

    const body = await request.json();
    const { name, planned_amount, category } = body;

    // Creating entitiy
    const { data: newBudgetItem, error: insertError } = await supabaseAdmin
      .from("budget_item")
      .insert({
        budget_id: budgetId,
        name,
        planned_amount,
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
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
