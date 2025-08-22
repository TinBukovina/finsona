import useSWR, { SWRConfiguration } from "swr";
import { GetWalletsResponse } from "../model/types";
import { fetcher } from "@/6_shared/api";

export function useWallets(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<GetWalletsResponse>(
    "/api/wallets",
    fetcher,
    {
      ...options,
      onSuccess: (data, key, config) => {
        console.log("SWR Uspjeh! Podaci dohvaćeni za ključ:", key);
      },
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
