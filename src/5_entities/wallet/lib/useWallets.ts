import useSWR from "swr";
import { GetWalletsFromAPI } from "../model/types";
import { fetcher } from "@/6_shared/api";

export function useWallets() {
  const { data, error, isLoading, mutate } = useSWR<GetWalletsFromAPI>(
    "/api/wallets",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
