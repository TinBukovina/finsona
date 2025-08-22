"use client";

import { useAppContext } from "@/1_app";
import { useBudgetItems } from "@/5_entities";
import { useCreateTransaction } from "@/5_entities/transactions/lib/useCreateTransactions";
import { useToast } from "@/6_shared";
import { useMemo, useState } from "react";
import { useSWRConfig } from "swr";

export function useAddTransactionForm(onClose?: () => void) {
  const { appState } = useAppContext();
  const { addToast } = useToast();
  const { mutate } = useSWRConfig();

  const { data: budgetItemsData, isLoading: areBudgetItemsLoading } =
    useBudgetItems(appState.selectedBudgetId);
  const { createTransaction, isCreating } = useCreateTransaction();

  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [budgetItem, setBudgetItem] = useState("");
  const [description, setDescription] = useState("");

  const availableBudgetItems = useMemo(() => {
    return (budgetItemsData || []).filter((item) =>
      transactionType === "income"
        ? item.category.toLowerCase() === "income"
        : item.category.toLowerCase() !== "income"
    );
  }, [budgetItemsData, transactionType]);

  const resetInputs = () => {
    setAmount("");
    setDate(new Date());
    setBudgetItem("");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !budgetItem || !description) {
      addToast("Please fill all fields!", "error");
      return;
    }

    console.log(appState);
    try {
      await createTransaction({
        wallet_id: appState.activeWalletId!,
        budget_item_id: budgetItem,
        type: transactionType,
        amount: parseFloat(amount.replace(",", ".")),
        description: description,
        transaction_date: date,
      });

      addToast("Transaction created!", "success");

      // Reset all relative hooks
      mutate(`/api/budgets/${appState.selectedBudgetId}/transactions`);
      mutate(`/api/budgets/${appState.selectedBudgetId}`);

      resetInputs();
      onClose?.();
    } catch (error) {
      console.log(error);
      addToast("Something went wrong.", "error");
    }
  };

  return {
    // Values
    amount,
    date,
    budgetItem,
    description,
    transactionType,
    availableBudgetItems,
    isLoading: areBudgetItemsLoading || isCreating,
    // Setters
    setAmount,
    setDate,
    setBudgetItem,
    setDescription,
    setTransactionType,
    // Actions
    handleSubmit,
  };
}
