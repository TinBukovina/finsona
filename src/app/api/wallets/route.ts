import { NextResponse } from "next/server";
import { getSession, supabaseAdmin } from "@/6_shared/server";
import { CreateWalletResponse, GetWalletsResponse } from "@/5_entities";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Catch all wallets from a user
    const { data: wallets, error } = await supabaseAdmin
      .from("wallets")
      .select("*")
      .eq("owner_id", session.id);

    if (error) {
      throw error;
    }

    return NextResponse.json<GetWalletsResponse>(
      { message: "Success", wallets },
      { status: 200 }
    );
  } catch (error) {
    console.error("[WALLET_GET_ERROR]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
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

    const { type, name } = await request.json();

    if (!name || name.length <= 2) {
      return NextResponse.json(
        { message: "Invalid wallet name, minimum length is 3 characters" },
        { status: 400 }
      );
    }

    if (!type || !["personal", "business", "savings"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid wallet type" },
        { status: 400 }
      );
    }

    const { data: wallet, error } = await supabaseAdmin
      .from("wallets")
      .insert({
        owner_id: session.id,
        type,
        name,
        initial_balance: 0,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(wallet, {
      status: 201,
    });
  } catch (error) {
    console.error("[WALLET_POST_ERROR]: ", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
