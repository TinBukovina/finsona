import useSWRMutation from "swr/mutation";

interface UpdateArgs {
  itemId: string;
  data: {
    name?: string;
    planned_amount?: string;
    category?: string;
  };
}

async function updateItemRequest(url: string, { arg }: { arg: UpdateArgs }) {
  const updateUrl = `${url}/${arg.itemId}`;
  const response = await fetch(updateUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg.data),
  });
  if (!response.ok) throw new Error("Failed to update item.");
  return response.json();
}

export function useUpdateBudgetItem() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/budget-items",
    updateItemRequest
  );
  return { updateBudgetItem: trigger, isUpdating: isMutating };
}
