import useSWRMutation from "swr/mutation";

interface UpdateCategoryArgs {
  budgetId: string;
  oldName: string;
  newName: string;
}

async function updateBudgetCategoryRequest(
  url: string,
  { arg }: { arg: UpdateCategoryArgs }
) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Failed to rename category.");
  }

  return true;
}

export function useUpdateBudgetCategory() {
  const { trigger } = useSWRMutation(
    "/api/budget-items/bulk",
    updateBudgetCategoryRequest
  );

  return { updateBudgetCategory: trigger };
}
