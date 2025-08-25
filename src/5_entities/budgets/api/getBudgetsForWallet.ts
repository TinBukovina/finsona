import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { BudgetInterface, GetBudgetsResponse } from "../model/types";

export async function getBudgetsForWallet(
  walletId: string
): Promise<BudgetInterface[]> {
  noStore();

  try {
    const cookieStore = await cookies();

    const apiUrl = new URL(
      `/api/wallets/${walletId}/budgets`,
      process.env.NEXT_PUBLIC_API_URL!
    );

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Cookie: cookieStore.toString(), // Proslijedi sve kolačiće
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch budgets on the server.");
    }

    const data: BudgetInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return []; // Vrati prazan niz u slučaju greške
  }
}
