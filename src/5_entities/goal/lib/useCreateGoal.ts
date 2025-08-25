import useSWRMutation from "swr/mutation";
import { GoalInterface } from "../model/types";
interface CreateGoalArgs {
  name: string;
  target_amount: number;
  target_date: Date;
}

async function createGoalRequest(
  url: string,
  { arg }: { arg: CreateGoalArgs }
): Promise<GoalInterface> {
  const absoluteUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  const response = await fetch(absoluteUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    throw new Error("Something went wrong.");
  }

  return response.json();
}

export function useCreateGoal() {
  const { trigger, isMutating, error, data } = useSWRMutation(
    "/api/goals",
    createGoalRequest
  );

  return {
    createGoal: trigger,
    isCreating: isMutating,
    error,
    data,
  };
}
