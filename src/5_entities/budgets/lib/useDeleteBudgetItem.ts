import useSWRMutation from "swr/mutation";

async function deleteItemRequest(url: string, { arg }: { arg: string }) {
  const deleteUrl = `${url}/${arg}`;
  const response = await fetch(deleteUrl, { method: "DELETE" });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete item.");
  }
  return true;
}

export function useDeleteBudgetItem() {
  const { trigger, isMutating } = useSWRMutation(
    `/api/budget-items`,
    deleteItemRequest
  );

  return { deleteBudgetItem: trigger, isDeleting: isMutating };
}
