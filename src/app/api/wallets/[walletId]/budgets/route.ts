import { NextResponse } from "next/server";
import { z } from "zod";

import { CreateBudgetResponse, GetBudgetsResponse } from "@/5_entities";
import { getSession } from "@/6_shared/auth";
import { supabaseAdmin } from "@/6_shared/server";

export async function GET(
  request: Request,
  { params }: { params: { walletId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { walletId } = await params;

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

// Define Zod Schema for validation of input
const createBudgetSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
  })
  .refine((data) => new Date(data.start_date) < new Date(data.end_date), {
    message: "Start date must be before end date",
    path: ["end_date"],
  });

export async function POST(
  request: Request,
  { params }: { params: { walletId: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { walletId } = await params;

    // Check if user is owner of a wallet
    const { error: ownerError } = await supabaseAdmin
      .from("wallets")
      .select("id")
      .eq("id", walletId)
      .eq("owner_id", session.id)
      .single();

    if (ownerError) {
      return NextResponse.json(
        { message: "Forbidden access!" },
        { status: 403 }
      );
    }

    // Validation of body
    const body = await request.json();
    const validationResult = createBudgetSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid data provided.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, start_date, end_date } = validationResult.data;

    // Insert data in db
    const { data: newBudget, error: insertError } = await supabaseAdmin
      .from("budgets")
      .insert({
        wallet_id: walletId,
        name,
        start_date,
        end_date,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json<CreateBudgetResponse>(
      { message: "Success", newBudget },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
