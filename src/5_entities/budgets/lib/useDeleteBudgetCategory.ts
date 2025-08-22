import useSWRMutation from "swr/mutation";

interface DeleteCategoryArgs {
  budgetId: string;
  name: string;
}

async function deleteBudgetCategoryRequest(
  url: string,
  { arg }: { arg: DeleteCategoryArgs }
) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!res.ok) throw new Error("Failed to delete category.");

  return true;
}

export function useDeleteBudgetCategory() {
  const { trigger } = useSWRMutation(
    "/api/budget-items/bulk",
    deleteBudgetCategoryRequest
  );

  return { deleteBudgetCategory: trigger };
}
