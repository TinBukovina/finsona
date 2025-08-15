import useSWR from "swr";

import { GetBudgetsResponse } from "./types";
import { fetcher } from "@/6_shared/api";

export function useBudgets(walletId: string | null) {
  const key = walletId ? `/api/wallets/${walletId}/budgets` : null;

  const { data, error, isLoading, mutate } = useSWR<GetBudgetsResponse>(
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
