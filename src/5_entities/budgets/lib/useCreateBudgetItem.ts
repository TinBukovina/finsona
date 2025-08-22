import useSWRMutation from "swr/mutation";

interface CreateBudgetItemArg {
  name: string;
  planned_amount: number;
  category: string;
}

async function createItemRequest(
  url: string,
  { arg }: { arg: CreateBudgetItemArg }
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create budget item.");
  }

  return response.json();
}

export function useCreateBudgetItem(budgetId: string | null | undefined) {
  const { trigger, isMutating } = useSWRMutation(
    budgetId ? `/api/budgets/${budgetId}/items` : null,
    createItemRequest
  );

  return {
    createBudgetItem: trigger,
    isCreating: isMutating,
  };
}
