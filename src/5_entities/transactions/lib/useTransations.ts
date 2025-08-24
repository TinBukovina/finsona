import { TransactionInterface } from "../model/types";
import useSWR from "swr";

async function getTransactionsRequest(
  url: string
): Promise<TransactionInterface[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    throw new Error(errorData || "Failed to fetch transactions.");
  }

  return res.json();
}

export function useTransactions(budgetId: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<TransactionInterface[]>(
    budgetId ? `/api/budgets/${budgetId}/transactions` : null,
    getTransactionsRequest
  );

  return { data, isLoading, error, mutateTransactions: mutate };
}
