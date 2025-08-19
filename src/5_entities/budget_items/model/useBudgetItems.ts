import useSWR from "swr";

import { fetcher } from "@/6_shared/api";
import { BudgetItemInterface } from "../types";

export function useBudgetItems(budgetId: string | null) {
  const key = budgetId ? `/api/budgets/${budgetId}` : null;

  const { data, error, isLoading, mutate } = useSWR<BudgetItemInterface[]>(
    key,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutateBudgets: mutate,
  };
}
