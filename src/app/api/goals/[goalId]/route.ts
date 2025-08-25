import { supabaseAdmin } from "@/6_shared/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { goalId: string } }
) {
  const { goalId } = await params;
  const { amount } = await request.json();

  try {
    const { error } = await supabaseAdmin.rpc("update_goal_amount", {
      goal_id_param: goalId,
      amount_param: amount,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "Goal updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
