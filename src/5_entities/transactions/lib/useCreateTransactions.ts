import useSWRMutation from "swr/mutation";

interface CreateTransactionArgs {
  wallet_id: string;
  budget_item_id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  transaction_date: Date;
}

async function createTransactionRequest(
  url: string,
  { arg }: { arg: CreateTransactionArgs }
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create transaction.");
  }
  return response.json();
}

export function useCreateTransaction() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/transactions",
    createTransactionRequest
  );

  return { createTransaction: trigger, isCreating: isMutating };
}
