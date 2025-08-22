import useSWR from "swr";

import { BudgetItemInterface } from "../../budget_items/types";

async function getBudgetItemsRequest(
  url: string
): Promise<BudgetItemInterface[]> {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch budget items.");
  }

  return res.json();
}
export function useBudgetItems(budgetId: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<BudgetItemInterface[]>(
    budgetId ? `/api/budgets/${budgetId}` : null,
    getBudgetItemsRequest
  );

  return {
    data,
    isLoading,
    error,
    mutateBudgetItems: mutate,
  };
}
