"use client";

import React from "react";

import { SpinnerLoader } from "@/6_shared";
import { useAddTransactionForm } from "./useAddTransactionForm";
import { AddTransactionsForm } from "./AddTransactionForm";

interface AddTransactionsComponentProps {
  onClose?: () => void;
}

export function AddTransactionsComponent({
  onClose,
}: AddTransactionsComponentProps) {
  const formStateAndHandlers = useAddTransactionForm(onClose);

  if (formStateAndHandlers.isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <SpinnerLoader />
      </div>
    );
  }

  return <AddTransactionsForm {...formStateAndHandlers} onClose={onClose} />;
}
