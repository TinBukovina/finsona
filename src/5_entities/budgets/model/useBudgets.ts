import useSWR from "swr";

import { GetBudgetsResponse } from "./types";

export function useBudgets(walletId: string | null) {
  const key = walletId ? `/api/wallets/${walletId}/budgets` : null;

  const { data, error, isLoading, mutate } = useSWR<GetBudgetsResponse>(key);

  return {
    data,
    isLoading,
    error,
    mutateBudgets: mutate,
  };
}
