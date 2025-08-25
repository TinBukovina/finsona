import useSWR, { SWRConfiguration } from "swr";
import { GoalInterface } from "../model";

export function useGoals(options?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<GoalInterface[]>(
    "/api/goals",
    options
  );

  return { data, error, isLoading, mutate };
}
