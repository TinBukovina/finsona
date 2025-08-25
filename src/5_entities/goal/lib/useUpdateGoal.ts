import { error } from "console";
import useSWRMutation from "swr/mutation";

async function updateGoalRequest(url: string, { arg }: { arg: number }) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: arg }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error("Something went wrong.");
  }
  return true;
}

export function useUpdateGoal(goalId: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/goals/${goalId}`,
    updateGoalRequest
  );
  return { updateGoal: trigger, isUpdating: isMutating };
}
